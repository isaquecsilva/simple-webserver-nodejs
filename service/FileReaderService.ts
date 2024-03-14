interface FileReaderServiceInterface {
    readall(filepath: string): Promise<Buffer>
}

import { readFile } from 'node:fs'

class FileReaderService implements FileReaderServiceInterface {
    readall(filepath: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            readFile(filepath, (err, buf) => {
                if (err) reject(err.message)
                else resolve(buf)
            })
        })
    }
}

export {
    FileReaderServiceInterface,
    FileReaderService,
}