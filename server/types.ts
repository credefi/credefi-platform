import { IncomingMessage, ServerResponse } from 'http';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';

import { ParsedUrlQuery } from 'querystring';

export interface Request extends IncomingMessage {
    params: object | any;
    body: object | string | any;
    parsedUrl: string;
    query: ParsedUrlQuery;
    cookie: ParsedUrlQuery;
    headers: {
        'accept-encoding': string,
        'origin': string,
        'cookie': string
    };
}

export interface Http2Request extends Http2ServerRequest {
    params: object;
    body: object | string;
    parsedUrl: string;
    query: ParsedUrlQuery;
    cookie: ParsedUrlQuery;
    headers: {
        'accept-encoding': string,
        'origin': string,
        'cookie': string
    };
}

export interface Response extends ServerResponse {
    cookieStore: string[];
    render(template: string, data: object): void;
    send(content: string): void;
    json(content: object): void;
    setCookie(key: string, value: any, expire?: number): void;
    deleteCookie(key: string): void;
}

export interface Http2Response extends Http2ServerResponse {
    cookieStore: string[];
    render(template: string, data: object): void;
    send(content: string): void;
    json(content: object): void;
    setCookie(key: string, value: any, expire?: number): void;
    deleteCookie(key: string): void;
}

