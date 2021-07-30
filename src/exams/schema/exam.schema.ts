import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExamDocument = Exam & Document;

@Schema()
export class Exam {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  sort: number;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
