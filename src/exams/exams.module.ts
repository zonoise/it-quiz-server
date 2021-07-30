import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsResolver } from './exams.resolver';
import { Exam, ExamSchema } from './schema/exam.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
  ],
  providers: [ExamsResolver, ExamsService],
})
export class ExamsModule {}
