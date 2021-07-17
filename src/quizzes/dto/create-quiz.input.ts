import { InputType, Int, Field } from '@nestjs/graphql';
import { Choice } from '../entities/quiz.entity';

@InputType()
export class CreateQuizInput {
  @Field(() => Int, { description: '問の番号　 例:問'})
  quizNumber: number;

  @Field(() => String, { description: '問題文' })
  title: string;

  @Field(() => String, { description: '問題文 詳細' })
  detail: string;
  
  @Field(() => String, { description: '問題文 画像' })
  image: string;
  
  @Field(() => [ChoiceInput] ,{description:'選択肢'})
  choices: ChoiceInput[];

  @Field(() => String,{description:'正解インデックス'})
  answer: string;

  @Field(() => String, { description: 'いつの試験か。　例:令和元年秋' })
  srcExam: string;
}

@InputType()
export class ChoiceInput {
  @Field(() => String, { description: '(例)ア イ ウ エ' })
  index: string;

  @Field(() => String, { description: '選択肢本文' })
  body: string;
}