import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
constructor(config:ConfigService, private prisma:PrismaService){
    const secret=config.get("SECRET_KEY")
    super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:secret
    })
}
async validate(data:{
    email:string,
    id:number
}){
const user=await this.prisma.user.findUnique({
    where:{
        id:data.id
    }
})
delete user.password
return user
}
}