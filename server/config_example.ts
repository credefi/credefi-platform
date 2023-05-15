import { readFileSync } from 'fs';
import { join } from 'path';

export const SSL = {
    key: readFileSync(join(process.cwd(), 'ssl', 'privkey.pem')),
    cert: readFileSync(join(process.cwd(), 'ssl', 'cert.pem')),
    ca: readFileSync(join(process.cwd(), 'ssl', 'chain.pem')),
    passphrase: '',
    allowHTTP1: true,
    enable: true
}

export const Environment = {
    hostname: '127.0.0.1',
    static_folder: 'dist/application-client',
    cache: 14400000,
    port: 5013
}