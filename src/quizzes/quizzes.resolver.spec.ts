import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesModule } from './quizzes.module';
import { QuizzesResolver } from './quizzes.resolver';
import { QuizzesService } from './quizzes.service';
import { QuizSchema, Quiz } from './schema/quiz.schema';

describe('QuizzesResolver', () => {
  let resolver: QuizzesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizzesResolver, QuizzesService],
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    resolver = await module.resolve<QuizzesResolver>(QuizzesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
