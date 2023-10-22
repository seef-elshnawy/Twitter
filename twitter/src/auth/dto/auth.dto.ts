import { IsEmail, IsNumber,IsNotEmpty,IsString, IsObject } from "class-validator";

export class AuthDto{
@IsString()
@IsNotEmpty()
firstName:string

@IsString()
@IsNotEmpty()
lastName:string

@IsString()
@IsNotEmpty()
password:string

@IsEmail()
@IsNotEmpty()
email:string

@IsString()
@IsNotEmpty()
nickName:string

@IsObject()
img:Object
}

export class SigninDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string
    
    @IsNotEmpty()
    @IsString()
    password:string
}