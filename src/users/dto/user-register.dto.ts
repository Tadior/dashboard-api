import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong Email !' })
	email: string;
	@IsString({ message: "password isn't passed" })
	password: string;
	@IsString({ message: "name isn't passed" })
	name: string;
}
