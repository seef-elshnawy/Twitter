import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CommentsService } from './comments.service';
import { GetUser } from 'src/auth/decorator';
import { Comment , Response} from './dto';

@UseGuards(JwtGuard)
@Controller('comments')
export class CommentsController {
   constructor(private comment:CommentsService){} 
 @Post('add')   
 addComment(@GetUser('id') userId:number,@Body() dto:Comment){
   return this.comment.addComment(userId,dto)
 }
 @Post('users')
 getUsers_comment(@Body('users') users:[]){
   return this.comment.getUsers_comment(users)
 }

 @Delete('remove')
 removeComment(@Body() dto:Comment){
    return this.comment.removeComment(dto)
 }
 @Patch('edit')
 editComment(@Body() dto:Comment){
    return this.comment.editComment(dto)
 }
 @Post('get')
 getComments(@Body("id") tweetId:number){
    return this.comment.getComments(tweetId)
 }
 
}
