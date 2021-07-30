import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';

@Resolver(() => Quiz)
export class QuizzesResolver {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Mutation(() => Quiz)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.quizzesService.create(createQuizInput);
  }

  @Query(() => [Quiz], { name: 'quizzes' })
  findAll() {
    return this.quizzesService.findAll();
  }

  @Query(() => [Quiz], { name: 'findQuizzesByTags' })
  findQuizzesByTag(@Args('tags', { type: () => [String] }) tags: string[]) {
    return this.quizzesService.findAllByTags(tags);
  }

  @Query(() => [Quiz], { name: 'findQuizzesByExam' })
  findQuizzesByExam(@Args('exam', { type: () => String }) exam: string) {
    const ret = this.quizzesService.findByAllExam(exam);
    return ret;
  }

  @Query(() => Quiz, { name: 'quiz' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Query(() => Quiz, { name: 'nextQuiz', nullable: true })
  findNext(@Args('id', { type: () => String }) id: string) {
    return this.quizzesService.findNext(id);
  }
}
