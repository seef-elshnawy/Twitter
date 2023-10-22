import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUser, SearchUser } from './dto';
import { use } from 'passport';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}
async editUser(userId:number,dto:EditUser){
const user=await this.prisma.user.update({
    where:{
        id:userId
    },
    data:{
        ...dto
    },
    include:{
        tweets:true,
        followers:true,
        followings:true,
    }
})
delete user.password
return user
}
async getUser(userId:string){
    
const user=await this.prisma.user.findUnique({
    where:{
        id:parseInt(userId)
    },
    include:{
        tweets:true,
        followers:true,
        followings:true,
        comments:true,
        Responses:true
    }
})
delete user.password
return user
}
async getAnyUser(dto:SearchUser){
    const user=await this.prisma.user.findUnique({
        where:{
            id:parseInt(dto.userId)
        },
        include:{
            tweets:true,
            followers:true,
            followings:true,
        }
    })
    delete user.password
    return user
    }
async getUsers(users:[]){
    const user=await this.prisma.user.findMany({
        include:{
            tweets:true,
            Responses:true,
            followers:true,
            followings:true,
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
async Search(dto:SearchUser){
const firsName= await this.prisma.user.findMany({
    where:{
        firstname:dto.Search,
    },
    include:{
        followers:true,
        followings:true,
        tweets:true
    },
    
}).then(s=>s.filter(a=>delete a.password))

const lastName= await this.prisma.user.findMany({
    where:{
        lastname:dto.Search,
    },
    include:{
        followers:true,
        followings:true,
        tweets:true
    }
}).then(s=>s.filter(a=>delete a.password))
const nickName= await this.prisma.user.findMany({
    where:{
        nickname:dto.Search,
    },
    include:{
        followers:true,
        followings:true,
        tweets:true
    }
}).then(s=>s.filter(a=>delete a.password))
const fullName=  await this.prisma.user.findMany({
   where:{
    fullname:dto.Search,
   },
   include:{
    followers:true,
    followings:true,
    tweets:true,
    comments:true,
    Responses:true,
}
}).then(s=>s.filter(a=>delete a.password))


if(firsName[0]!==undefined){
return firsName
}else if(firsName[0]===undefined){
if(lastName[0]!==undefined){
    return lastName
}else{
    if(fullName[0]!==undefined){
        return fullName
    }
    else if(nickName[0]!==undefined){
    return nickName
    }
}
}else {
    return undefined
}
}
}
