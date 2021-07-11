import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Quiz {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  quizNumber: number;

  @Field(() => String, { description: '問題文' })
  title: string;

  @Field(() => [Choice])
  choices: [Choice];

  @Field(() => String, { description: 'いつの試験か。　例:令和元年秋' })
  srcExam: string;
}

@ObjectType()
export class Choice {
  @Field(() => String, { description: '(例)ア イ ウ エ' })
  index: string;

  @Field(() => String, { description: '選択肢本文' })
  body: string;
}
