import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Users {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  avatar: string;

  // TODO: arts.schema 추가
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' },
  })
  bookmarks: [];

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
