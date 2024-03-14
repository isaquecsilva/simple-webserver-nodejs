import dotenv from 'dotenv'
import {join} from 'node:path'

const envFile: string = join(__dirname, '..', '..', '.env')

dotenv.config({
    path: envFile,
})

