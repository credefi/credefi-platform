import 'zone.js/node';

import cluster from 'cluster';
import { cpus } from 'os';

import { container } from './decorators';
import { HttpServer } from './server';

if (cluster.isPrimary) {

    let numCores = cpus().length;
    console.log('Master cluster started');
    
    for (let i = 0; i < numCores; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });

} else {

    const server = container.resolve(HttpServer);
    server.listen();

}