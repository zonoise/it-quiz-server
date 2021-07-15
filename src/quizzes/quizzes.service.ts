import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { Quiz, QuizDocument } from './schema/quiz.schema';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async create(createQuizInput: CreateQuizInput) {
    const createdQuiz = new this.quizModel(createQuizInput);
    return await createdQuiz.save();
  }

  findAll() {
    return this.quizModel.find().exec();
  }

  findOne(id: string) {
    return this.quizModel.findById(id);
  }

  update(id: number, updateQuizInput: UpdateQuizInput) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
