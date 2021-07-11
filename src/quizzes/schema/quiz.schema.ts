import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop()
  quizNumber: number;

  @Prop()
  title: string;

  @Prop()
  choices: [{ index: string; body: string }];

  @Prop()
  srcExam: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
