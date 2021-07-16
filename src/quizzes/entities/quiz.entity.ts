import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType({description: '問題'})
export class Quiz {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { description: '何問目か' })
  quizNumber: number;

  @Field(() => String, { description: '問題文',nullable:false })
  title: string;

  @Field(() => [Choice],{ description: '選択肢' })
  choices: [Choice];

  @Field(() => [String],{description:'タグ'})
  tags: string[];

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
