import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {CommandExecutor} from "../../core/executor/command.executor";
import {IStreamLogger} from "../../core/handlers/stream-logger.interface";
import {ICommandExecFfmpeg, IFfmpegInput} from "./ffmpeg.types";
import {FileService} from "../../core/files/file.service";
import {PromptService} from "../../core/prompt/prompt.service";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService()
    private promptService: PromptService = new PromptService()

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width: number = await this.promptService.input<number>('Ширина', 'number')
        const height: number = await this.promptService.input<number>('Высота', 'number')
        const path: string = await this.promptService.input<string>('Путь до файла', 'input')
        const fileName: string = await this.promptService.input<string>('Имя файла', 'input')
        return {width, height, path, fileName}
    }

    protected build(input: IFfmpegInput): ICommandExecFfmpeg {
        const outputPath = this.fileService.getFilePath(input.path, input.fileName, 'mp4')
        const args = new FfmpegBuilder().input(input.path).setVideoSize(input.width, input.height).output(outputPath)
        return {command: 'ffmpeg', args: args, outputPath: outputPath};

    }

    protected spawn({outputPath, command: commmand, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFile(outputPath);
        return spawn(commmand, args);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }

}