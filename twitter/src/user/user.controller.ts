import { Body, Controller, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { EditUser, SearchUser } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
constructor(private userService:UserService){}

  @Get('me')
  getUser(@GetUser('id') userId:string){
    return this.userService.getUser(userId)
  }
  @Post('users')
  getUsers(@Body('users') users:[]){
     console.log(typeof users)
    return this.userService.getUsers(users)
  }
  @Post('get')
   getAnyUser(@Body() dto:SearchUser){
    return this.userService.getAnyUser(dto)
   }
  @Patch('edit')
  editUser(@GetUser('id') userId:number ,@Body() dto:EditUser){
    return this.userService.editUser(userId,dto)
  }

  @Post('search')
  Search(@Body() dto:SearchUser){
   return this.userService.Search(dto)
  }
}
