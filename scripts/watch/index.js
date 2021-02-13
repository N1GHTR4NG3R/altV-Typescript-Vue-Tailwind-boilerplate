import path from 'path';
import kleur from 'kleur';
import kill from 'tree-kill';
import _ from 'lodash';
import chokidar from 'chokidar';
import fs from 'fs';
import child_process from 'child_process';

let serverProcess;

const getExec = process.platform === 'win32' ? 'altv-server.exe' : 'start.sh';
const pathToExec = path.resolve(process.cwd(), getExec);
const pathToResources = path.resolve(process.cwd(), 'resources');

const runServer = () => {
    if (!fs.existsSync(pathToExec)) {
        throw new Error(kleur.red(`${getExec} not found`));
    }

    return child_process.spawn(pathToExec, { stdio: 'inherit' });
};

const callback = _.debounce(async () => {
    if (serverProcess) {
        console.log(kleur.green('\nRestarting server...\n'));

        try {
            kill(serverProcess.pid, 'SIGKILL', function (err) {
                if (err) {
                    serverProcess = runServer();
                    // throw err;
                }
                serverProcess.kill();
                serverProcess = runServer();
            });
        } catch (error) {
            if (error.code === 128) {
                serverProcess = runServer();
            }
        }
    } else {
        serverProcess = runServer();
    }
}, 1000);

chokidar.watch(pathToResources).on('all', callback);
