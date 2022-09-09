import { IsNotEmpty, IsString} from "class-validator";

export class CreateAuthorDto {
    @IsNotEmpty()
    id: Number

    @IsNotEmpty()
    @IsString()
    name: string
}