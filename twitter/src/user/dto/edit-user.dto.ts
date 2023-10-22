import { IsObject, IsOptional, IsString } from "class-validator"

export class EditUser{
@IsOptional()
@IsString()    
email:string
@IsOptional()
@IsString()  
password:string
@IsOptional()
@IsString()  
firstname:string
@IsOptional()
@IsString()  
lastname:string
@IsOptional()
@IsString()  
nickname:string
@IsOptional()
@IsObject()  
img:object
}

export class SearchUser{
@IsOptional()
@IsString()  
Search:string
@IsOptional()
@IsString() 
userId:string
}