import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ immutable: true })
  txt: string;

  @Prop()
  done: boolean;

  @Prop({ immutable: true })
  timeStamp: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
