import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const cors=require('cors')
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin:"http://localhost:3000"
  }))
  await app.listen(8000);
}
bootstrap();
