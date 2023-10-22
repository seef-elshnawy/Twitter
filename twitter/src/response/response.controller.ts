import { Body, Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ResponseService } from './response.service';
import { GetUser } from 'src/auth/decorator';
import { ResponseDto } from './dto';

@UseGuards(JwtGuard)
@Controller('response')
export class ResponseController {
    constructor(private responses:ResponseService){}
  @Post('add')
  addResponse(@GetUser('id') userId:number,@Body() dto:ResponseDto){
   return this.responses.addResponse(userId,dto)
  }
   @Post('all')
   getResponses(@Body() dto:ResponseDto){
    return this.responses.getResponses(dto)
   }
   @Post('find')
   getThisRespons(@Body('id') Id:number){
    return this.responses.getThisRespons(Id)
   }
   @Patch('edit')
   editResponses(@Body('id') Id:number,@GetUser('id') userId:number,@Body() dto:ResponseDto){
    return this.responses.editResponse(Id,dto,userId)
   } 
   @Delete('delete')
   deleteResponse(@Body('id') Id:number,@GetUser('id') userId:number){
    return this.responses.deleteResponse(Id,userId)
   } 
}

