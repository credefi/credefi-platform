import { stat, createReadStream, Stats } from 'fs';
import { join, resolve, normalize } from 'path';
import { getType } from 'mime';
import { createHash } from 'crypto';
import { createGzip, createDeflate } from 'zlib';

import { singleton } from './decorators';
import { Request, Response } from './types';
import { Environment } from './config';

@singleton()

export class StaticFiles {

    private staticPath = Environment.static_folder;
    private cache = Environment.cache;
    private readonly ignore = ['/index.html'];

    constructor() { }

    isExist(req: Request): Promise<Stats> {
        return new Promise((resolve, reject) => {
            const path = this.parsePath(req);
            return stat(path, (err, stats) => {
                if (err || stats.isDirectory()) {
                    return reject(err);
                }
                return resolve(stats);
            });
        });
    }

    sendFile(req: Request, res: Response, stats: Stats): Promise<void> {

        return new Promise((resolve, reject) => {

            const path = this.parsePath(req);
            const stream = createReadStream(path);
            const mime = getType(path) || 'application/octet-stream';
            const etag = this.getEtag(`${path},${stats.size},${stats.mtimeMs},${stats.birthtimeMs}`);
            const acceptEncoding = req.headers['accept-encoding'] || '';
            const headers: { [key: string]: any } = {
                'Content-Type': mime,
                'Date': stats.birthtime.toISOString(),
                'Last-Modified': stats.mtime.toUTCString(),
                'Vary': 'Accept - Encoding'
            };

            if (this.ignore.includes(req.parsedUrl)) {
                headers['ETag'] = `off`;
                headers['Cache-Control'] = `private, no-cache, no-store, must-revalidate, proxy-revalidate ,max-age=0`;
                headers['Expires'] = '0';
                headers['Pragma'] = 'no-cache';
            } else {
                headers['ETag'] = `W/"${etag}"`;
                headers['Cache-Control'] = `max-age=${this.cache}`;
                headers['Expires'] = new Date(Date.now() + this.cache).toUTCString();
            }

            stream.on('error', (error) => {
                return reject(error);
            });

            stream.on('end', () => {
                return resolve();
            });

            if (/\bgzip\b/.test(acceptEncoding)) {
                headers['Content-Encoding'] = 'gzip';
                res.writeHead(200, headers);
                return stream.pipe(createGzip()).pipe(res);
            } else if (/\bdeflate\b/.test(acceptEncoding)) {
                headers['Content-Encoding'] = 'deflate';
                res.writeHead(200, headers);
                return stream.pipe(createDeflate()).pipe(res);
            }


            return stream.pipe(res);

        });

    }

    private getEtag(data: string): string {
        return createHash('sha1')
            .update(data, 'utf8')
            .digest('base64');
    }

    private parsePath(req: Request): string {
        const resolvedBase = resolve(this.staticPath);
        const regExp = new RegExp('^(\\.\\.[\\/\\\\])+');
        const safeSuffix = normalize(req.parsedUrl).replace(regExp, '');
        return join(resolvedBase, safeSuffix);
    }

}
