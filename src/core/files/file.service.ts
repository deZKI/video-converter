import {join, dirname, isAbsolute} from "path";
import {promises} from "fs";

export class FileService {

    private async isExists(path: string): Promise<boolean> {
        try {
            await promises.stat(path)
        } catch {
            return false
        }
        return true
    }

    public getFilePath(path: string, name: string, ext: string) {
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path);
        }
        return join(dirname(path) + '/' + name + '.' + ext)
    }

    async deleteFile(path: string) {
        if (await this.isExists(path)) {
            await promises.unlink(path)
        }
    }
}