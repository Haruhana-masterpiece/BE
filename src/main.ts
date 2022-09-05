import 'dotenv/config';
import { setupSwagger } from './util/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 8000;

  setupSwagger(app);

  await app.listen(PORT, () => {
    console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
  });
}
bootstrap();
