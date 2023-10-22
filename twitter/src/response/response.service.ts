import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from './dto';
@Injectable()
export class ResponseService {
    constructor(private prisma:PrismaService){}
  async addResponse(userId:number,dto:ResponseDto){
        try{
       const response =await this.prisma.responses.create({
        data:{
            comment_text:dto.comment_text,
            commentId:parseInt(dto.commentId),
            userCreateId:userId,
            target:dto.target,
            tweetId:dto.tweetId
        },
        include:{
            user:true,
            targetUser:true,
            comment:true,
        }
       })

       return response
    }catch(err){
        return new ForbiddenException(err)
       }
  }
 async getResponses(dto:ResponseDto){
    try{
    const responses=await this.prisma.responses.findMany({
        where:{
            commentId:parseInt(dto.commentId)
        },
        include:{
            user:true,
            targetUser:true,
            comment:true
        }
    })
    responses.filter(a=>delete a.user.password)
    return responses
   }catch(err){
    return new ForbiddenException(err)
   }
 }
 async getThisRespons(Id:number){
    try{
    const response=await this.prisma.responses.findUnique({
        where:{
         id:Id   
        },
        include:{
            user:true,
            targetUser:true,
            comment:true
        }
    })
    delete response.user.password
   
    return response
    
  }catch(err){
    return new ForbiddenException(err)
   }
 }
 async editResponse(Id:number,dto:ResponseDto,userId:number){
    try{
    const response=await this.prisma.responses.update({
        where: {
            id: Id,
            userCreateId:userId
        },
        data: {
            comment_text:dto.comment_text,
            commentId:parseInt(dto.commentId),
            target:dto.target 
        },
        include:{
            user:true,
            targetUser:true,
            comment:true
        }
    })
  delete response.user.password 
 
  return response
   }catch(err){
    return new ForbiddenException(err)
   }
 } 
 async deleteResponse(Id:number,userId:number){
    try{
    const response=await this.prisma.responses.delete({
        where: {
            id:Id,
            userCreateId:userId
        }
    })
  return response
 }catch(err){
    return new ForbiddenException(err)
   }} 

}
