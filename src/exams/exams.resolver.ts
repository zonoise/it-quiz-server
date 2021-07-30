import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExamsService } from './exams.service';
import { Exam } from './entities/exam.entity';
import { CreateExamInput } from './dto/create-exam.input';
import { UpdateExamInput } from './dto/update-exam.input';

@Resolver(() => Exam)
export class ExamsResolver {
  constructor(private readonly examsService: ExamsService) {}

  @Query(() => [Exam], { name: 'exams' })
  findAll() {
    return this.examsService.findAll();
  }

  @Query(() => Exam, { name: 'exam' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.examsService.findOne(id);
  }

  @Query(() => Exam, { name: 'examBySlug' })
  findOneBySlug(@Args('slug', { type: () => String }) slug: string) {
    return this.examsService.findOneBySlug(slug);
  }
}
