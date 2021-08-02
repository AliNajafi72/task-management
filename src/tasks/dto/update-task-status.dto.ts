import { IsEnum } from "class-validator";
import { TaskStatus } from "../taskStatus.model";

export class UpdateTaskSTatusDTO {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}