import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"

export class AddTweet{
    @IsNumber()
    @IsNotEmpty()
    userId:number
    @IsOptional()
    @IsString()
    post:string
    @IsOptional()
    @IsObject()
    img:object
    
}
export class EditTweet{
    @IsNotEmpty()
    tweetId:string
    @IsNumber()
    @IsNotEmpty()
    userId:number
    @IsOptional()
    @IsString()
    post:string
    @IsOptional()
    @IsObject()
    img:object    
}

export class getTweet{
tweetId:string
}