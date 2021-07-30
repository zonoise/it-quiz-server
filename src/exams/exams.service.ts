import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExamInput } from './dto/create-exam.input';
import { Exam } from './entities/exam.entity';
import { ExamDocument } from './schema/exam.schema';

@Injectable()
export class ExamsService {
  constructor(@InjectModel(Exam.name) private examModel: Model<ExamDocument>) {}

  async create(createExamInput: CreateExamInput) {
    const createdExam = new this.examModel(createExamInput);
    return await createdExam.save();
  }

  findAll() {
    return this.examModel.find().exec();
  }

  findOne(id: number) {
    return this.examModel.findById(id);
  }

  findOneBySlug(slug: string) {
    return this.examModel.findOne({ slug: slug });
  }
}
