import { Resolver, Query, Args } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => [Tag], { name: 'tags' })
  findAll() {
    return this.tagsService.findAll();
  }

  @Query(() => Tag, { name: 'tagBySlug', nullable: true })
  findOneBySlug(@Args('slug', { type: () => String }) slug: string) {
    return this.tagsService.findOneBySlug(slug);
  }
}
