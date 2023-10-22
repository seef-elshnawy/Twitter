import { ForbiddenException, HttpCode, Injectable } from '@nestjs/common';
import { Comment, Response } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CommentsService {
    constructor(private prisma:PrismaService){}
async addComment(userId:number,dto:Comment){
    const tweetId=parseInt(dto.tweetId)
    try{
    const comment=await this.prisma.comments.create({
        data:{
            userCreateId:userId,
            comment_text:dto.comment_text,
            tweetId
        }
    })
return comment
}catch(err){
return new ForbiddenException(err)
}
}
async removeComment(dto:Comment){
    const commentId=parseInt(dto.comment_id)
    try{
    const comment =await this.prisma.comments.delete({
        where:{
            id:commentId
        }
    })
    return comment
}catch(err){
return new ForbiddenException(err)
}

}

async getUsers_comment(users:[]){
    const user=await this.prisma.user.findMany({
        include:{
            tweets:true,
            Responses:true,
            followers:true,
            followings:true,
            comments:true,
        }
    })  
    console.log(users)
    if(!users){
        return
    }else{
    const data=user.filter(s=>users.map(a=>a).find(z=>s.id===z))
     data.filter(a=>delete a.password)
    return data
    }
}
async editComment(dto:Comment){
    const id=parseInt(dto.comment_id)
    try{
    const comment=await this.prisma.comments.update({
        where:{
            id
        },
        data:{
            comment_text:dto.comment_text,
        }
    })
    return comment
   }catch(err){
   return new ForbiddenException(err)
   }
}
async getComments(tweetId:number){
    try{
    const comment=await this.prisma.comments.findMany({
        where:{
            tweetId
        },
        include:{
            Responses:true,
            user:true
        }       
    })
    return comment
   }catch(err){
   return new ForbiddenException(err)
   }
}
}
