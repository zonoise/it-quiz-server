import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Exam {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: '' })
  title: string;

  @Field(() => String, { description: '' })
  slug: string;

  @Field(() => Number, { description: '', nullable: true })
  sort: number;
}
