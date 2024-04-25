import {ICommandExec} from "../../core/executor/command.types";

export interface IFfmpegInput {
    width: number;
    height: number;
    path: string;
    fileName: string
}

export interface ICommandExecFfmpeg extends ICommandExec {
    outputPath: string
}