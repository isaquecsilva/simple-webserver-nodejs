import { Server, createServer } from 'node:http'
import { join} from 'node:path'
import {SignalConstants} from 'node:os'

import './config/Configuration'
import { RouterController } from './controller/Router'
import { FileReaderService } from './service/FileReaderService'

const PORT = process.env.PORT || 3000;

const service: FileReaderService = new FileReaderService()
const routerController = new RouterController([
    { pathRoute: '/', filePath: join(__dirname, '..', 'public', 'html', 'index.html') },
], service)

const server: Server = createServer((req, res) => routerController.handler(req, res))
server.listen(PORT, () => console.log(`server running at port ${PORT}`))

process.on('SIGINT', function(signal: SignalConstants) {
    console.log(`signal received: ${signal}`);
    console.log(`closing server...`);
    server.close()
})