import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Tag } from '../../tag/schemas/tag.schema';

// Document: MongoDB의 가장 작은 단위, 모듈에서 사용할 타입을 export 시켜줌
export type ArtsDocument = Arts & mongoose.Document;

// @Schema({ timestamps: { createdAt: "createdAt", updatedAt: false } })
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Arts {
  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'Author' })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  // tags: Tag[];
  tags: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  paintedAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  // object를 저장하는 것도 가능하다.
  //   @Prop({
  //     type: {
  //       id: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //       uuid: { required: true, type: String },
  //     },
  //   })
  //   friend: { id: 'sdf'; uuid: 'asdf' };
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const ArtsSchema = SchemaFactory.createForClass(Arts);
