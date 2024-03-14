import { IncomingMessage, ServerResponse } from 'http';
import RouteResult from './RouteTypes'
import { FileReaderServiceInterface } from "../service/FileReaderService";

interface RouteInterface {
    pathRoute: string,
    filePath: string,
}

class RouterController {
    private routes: RouteInterface[];
    private fileReader: FileReaderServiceInterface

    constructor(routes: RouteInterface[], fileReader: FileReaderServiceInterface) {
        this.routes = routes;
        this.fileReader = fileReader;
    }

    public async handler(req: IncomingMessage, res: ServerResponse): Promise<undefined> {
        const { url, method } = req;
        if (method == 'GET' && url) {
            let result = await this.callRoute(url);
            if (result instanceof Buffer) {
                res.writeHead(200, {'Content-Type': 'text/html'})
                    .end(result)
            } else 
            {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })

                res.end(result)
            }
        }
    }

    public async callRoute(urlPath: string): Promise<RouteResult> {
        try {
            const [ { filePath } ] = this.routes.filter(({ pathRoute }) => pathRoute == urlPath)
            let result = await this.fileReader.readall(filePath)

            if (typeof result === 'string') {
                // deu erro
                return Promise.reject(result)
            }
    
            return Promise.resolve(result)
        } catch(error: any) {
            return Promise.resolve(error.message)
        }
    }
}

export {
    RouteInterface,
    RouterController,
}