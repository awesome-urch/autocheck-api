import { IsEmail, IsString, isString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsString()
    password: string;
  }
  