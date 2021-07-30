import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExamInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
