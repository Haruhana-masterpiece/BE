import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { Module } from '@nestjs/common';
import { ArtsModule } from './arts/arts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from './tag/tag.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_URL),
    ArtsModule,
    TagModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('Haruhana', { prettyPrint: true }),
          ),
        }),
      ],
    }),
    TagModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
