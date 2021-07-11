import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesResolver } from './quizzes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema, Quiz } from './schema/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
  ],
  providers: [QuizzesResolver, QuizzesService],
})
export class QuizzesModule {}
