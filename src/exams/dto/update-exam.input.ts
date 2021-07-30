import { CreateExamInput } from './create-exam.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExamInput extends PartialType(CreateExamInput) {
  @Field(() => Int)
  id: number;
}
