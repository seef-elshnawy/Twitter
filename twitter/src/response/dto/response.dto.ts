import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ResponseDto{
@IsString()
@IsNotEmpty()    
comment_text:string
@IsString()
@IsNotEmpty()
commentId:string
@IsString()
@IsNotEmpty()
target:string
@IsNumber()
@IsNotEmpty()
tweetId:number
}