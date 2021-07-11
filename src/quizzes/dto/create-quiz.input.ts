import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuizInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  quizNumber: number;

  @Field(() => String, { description: '問題文' })
  title: string;

  @Field(() => [ChoiceInput])
  choices: [ChoiceInput];

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
