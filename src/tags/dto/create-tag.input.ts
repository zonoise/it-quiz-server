import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field(() => String, { description: 'スラッグ' })
  slug: string;

  @Field(() => String, { description: '' })
  title: string;
}
