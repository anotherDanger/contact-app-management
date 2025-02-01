import cluster from 'cluster';
import os from 'os';
import app from '../main/app.js';

const numCpus = os.cpus().length;

if(cluster.isPrimary)
{
    console.log(`Primary is started. Forking ${numCpus} workers`);

    for(let i = 0; i < numCpus; i++)
    {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exit`);
    });
}else{
    const server = app.listen(3000, () => {
        console.log(`Worker ${process.pid} started`);
    })
}