import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateQuizInput } from './dto/create-quiz.input';
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

  findAllByTags(tags: string[]) {
    return this.quizModel.find({ tags: { $in: tags } }).exec();
  }

  findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      console.log('invalid objectId');
    }

    return this.quizModel.findById(id);
  }

  findNext(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      console.log('invalid objectId');
      return null;
    }

    const quiz = this.findOne(id)
      .exec()
      .then((q) => {
        return this.quizModel.findOne({
          srcExam: q.srcExam,
          quizNumber: q.quizNumber + 1,
        });
      });

    return quiz;
  }
}
