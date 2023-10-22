import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SigninDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,private jwt:JwtService, private config:ConfigService){}


async signup(dto:AuthDto){
    const hash= await argon.hash(dto.password)
const user=await this.prisma.user.create({
data: {
  firstname:dto.firstName,
  lastname:dto.lastName,
  fullname:`${dto.firstName} ${dto.lastName}`,
  email:dto.email,
  nickname:dto.nickName,
  password:hash  
}
})
return user 
 
}

async signin(dto:SigninDto){
  const password=dto.password
  const user=await this.prisma.user.findUnique({
    where:{
      email:dto.email
    },
    include:{
      tweets:true,
      followers:true,
      followings:true,
    }
  })
  if(!user){
    throw new ForbiddenException('user not found')
  }
  const psMatch=await argon.verify(user.password,password)
  if(!psMatch){
    throw new ForbiddenException('password is wrong')
}
delete user.password
return this.signToken(user.email,user.id)
}
async signToken(email:string,id:number):Promise<{access_token:string}>{
  const data={
    email,
    id
  }
  const secret=this.config.get("SECRET_KEY")
  const token =await this.jwt.signAsync(
    data,
    {
      expiresIn:'60m',
      secret
    }
  )
  return {
    access_token:token
  }
}
}
