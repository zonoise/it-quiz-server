import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => String, { description: 'スラッグ' })
  slug: string;

  @Field(() => String, { description: '' })
  title: string;
}
