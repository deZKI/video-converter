import {IStreamLogger} from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {

    private static instance: ConsoleLogger;

    private constructor() {
    }

    public static getInstance(): ConsoleLogger {
        if (!this.instance) {
            this.instance = new ConsoleLogger()
        }
        return this.instance
    }

    log(...args: any[]): void {
        console.log(...args)
    }

    error(...args: any[]): void {
        console.log(...args)
    }

    end(): void {
        console.log('Готово')
    }


}