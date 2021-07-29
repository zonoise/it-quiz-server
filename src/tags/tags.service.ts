import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { Tag, TagDocument } from './schema/tag.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async create(createTagInput: CreateTagInput) {
    const createTag = new this.tagModel(createTagInput);
    return await createTag.save();
  }

  findAll() {
    return this.tagModel.find().exec();
  }

  findOneBySlug(slug: string) {
    return this.tagModel.findOne({ slug: slug }).exec();
  }

  updateAll() {
    const tags = this.tagModel.db
      .model('Quiz')
      .collection.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags' } },
      ]);
    tags.map((t) => t._id).forEach((d) => console.log(d));
  }
}
