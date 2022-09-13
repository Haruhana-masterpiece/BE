import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// Document: MongoDB의 가장 작은 단위, 모듈에서 사용할 타입을 export 시켜줌
export type AuthorDocument = Author & mongoose.Document;

// @Schema({ timestamps: { createdAt: "createdAt", updatedAt: false } })
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Author {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  birth: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  death: Date;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const AuthorSchema = SchemaFactory.createForClass(Author);
