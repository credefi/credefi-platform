import { createServer, Server } from 'http';
import { createSecureServer, Http2SecureServer } from 'http2';

import { URL } from 'url';
import { gzip, deflate } from 'zlib';
import { parse as parseQuery, ParsedUrlQuery } from 'querystring';

import { join } from 'path';
import { readFileSync } from 'fs';

import { injectable } from './decorators';
import { StaticFiles } from './staticFiles';
import { SSL, Environment } from './config';
import { Request, Response } from './types';
import { AppServerModule, renderModule } from '../src/main.server';

const indexHtml = readFileSync(join(process.cwd(), '/dist/application-client/index.html'), 'utf-8').toString();

@injectable()

export class HttpServer {

    server: Server | Http2SecureServer;

    port = Environment.port;
    hostname = Environment.hostname;
    serverPath = `${SSL.enable ? 'https' : 'http'}://${this.hostname}:${this.port}`

    constructor(
        private StaticFiles: StaticFiles
    ) {
        this.server = this.createServer();
    }

    createServer() {
        if (SSL.enable) {
            return createSecureServer(SSL, this.requestHandler.bind(this));
        }
        return createServer(this.requestHandler.bind(this));
    }

    listen() {
        const isHTTP2 = SSL.enable;

        return this.server.listen(this.port, this.hostname, () => {
            console.log(`Server ${process.pid} running at ${isHTTP2 ? 'https' : 'http'}://${this.hostname}:${this.port}`);
        });
    }

    private requestHandler(req: any, res: any): Promise<any> {

        return Promise
            .all([
                this.parseUrl(req.url),
                this.parseCookies(req)
            ])
            .then(([{ url, query, parsedUrl }, cookie]) => {

                req.query = query;
                req.cookie = cookie;
                req.parsedUrl = parsedUrl;

                return this.StaticFiles.isExist(req);
            })
            .then((stats) => {

                if (stats) {
                    return this.StaticFiles.sendFile(req, res, stats);
                }

                return this.render(req, res);
            })
            .catch((error) => {
                return this.render(req, res);
            });
    }

    private noCache(res: Response) {
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate, proxy-revalidate ,max-age=0');
        res.setHeader('Expires', '0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('ETag', 'off');
    }

    private render(req: Request, res: Response): void {
        renderModule(AppServerModule, {
            url: req.url,
            document: indexHtml,
            extraProviders: [
                {
                    provide: 'REQUEST',
                    useValue: req
                }
            ]
        }).then((html) => {
            return this.compression(req, res, html);
        }).then((view) => {
            this.noCache(res);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(view);
        }).catch((error) => {
            console.log(error);
            this.noCache(res);
            return res.end(indexHtml);
        });
    }

    private parseUrl(url: string): Promise<{ url: string, query: ParsedUrlQuery, parsedUrl: string }> {
        return new Promise((resolve, reject) => {
            try {
                const { pathname, search } = new URL(url, this.serverPath);
                const query = search.slice(1);
                const str = decodeURIComponent(query || '');
                const parsed = { ...parseQuery(str, '&', '=') };
                const tempUrl = decodeURIComponent(pathname);

                return resolve({
                    url: tempUrl.toLowerCase(),
                    query: parsed,
                    parsedUrl: tempUrl
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    private parseCookies(req: Request): Promise<ParsedUrlQuery> {
        return new Promise((resolve, reject) => {
            try {
                let cookies = req.headers['cookie'] || '';
                cookies = decodeURIComponent(cookies).replace(/ /g, '');
                return resolve({ ...parseQuery(cookies, ';', '=') });
            } catch (error) {
                return reject(error);
            }
        });
    }

    private compression(
        request: Request,
        response: Response,
        content: string | Buffer | Uint8Array
    ): Promise<Buffer | string | Uint8Array> {

        return new Promise((resolve, reject) => {

            const acceptEncoding = request.headers['accept-encoding'] || '';

            response.setHeader('Vary', 'Accept - Encoding');

            if (/\bgzip\b/.test(acceptEncoding)) {
                response.setHeader('Content-Encoding', 'gzip');
                return gzip(content, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            } else if (/\bdeflate\b/.test(acceptEncoding)) {
                response.setHeader('Content-Encoding', 'deflate');
                return deflate(content, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            }

            return resolve(content);
        });

    }

}
