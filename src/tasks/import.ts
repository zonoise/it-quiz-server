import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as yargs from 'yargs';
import * as fs from 'fs';
import { parse } from 'papaparse';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import {
  ChoiceInput,
  CreateQuizInput,
} from 'src/quizzes/dto/create-quiz.input';

async function bootstrap() {
  const argv = yargs
    .option('csvfile', {
      type: 'string',
      alias: 'f',
      description: 'CsvFilePath',
      demandOption: true,
    })
    .option('import', {
      type: 'boolean',
      alias: 'm',
      default: false,
      description: 'if true execute import process',
    })
    .help().argv;

  const csvFile: string = argv.csvfile as string;

  const csvData = await readFromCsv(csvFile);
  console.log('readFromCsv:', csvData);

  const app = await NestFactory.create(AppModule);
  const quizzeService = app
    .select(QuizzesModule)
    .get(QuizzesService, { strict: true });

  //insert to mongodb
  csvData.forEach((row) => {
    console.log('row', row);

    const choices: ChoiceInput[] = [
      { index: '1', body: row.choice_1 } as ChoiceInput,
      { index: '2', body: row.choice_2 } as ChoiceInput,
      { index: '3', body: row.choice_3 } as ChoiceInput,
      { index: '4', body: row.choice_4 } as ChoiceInput,
    ];

    const tags = [row.tag_1, row.tag_2, row.tag_3, row.tag_4].map(t => t.toLowerCase());

    const input: CreateQuizInput = {
      quizNumber: row.num,
      title: row.title,
      detail: row.detail,
      image: row.image,
      srcExam: row.exam,
      choices: choices,
      answer: row.answer,
      tags: tags,
    };

    console.log(input);

    quizzeService.create(input);
  });
}

//
async function readFromCsv(csvFile: string) {
  let res = [];
  const rs = fs.createReadStream(csvFile);

  const f = function readCsv(stream: fs.ReadStream) {
    return new Promise<any>((resolve, reject) => {
      parse(stream, {
        header: true,
        complete: (results: any) => {
          console.log(results);
          resolve(results.data);
        },
        error: (error, file) => {
          console.error(error, file);
          reject(error);
        },
      });
    });
  };

  await f(rs)
    .then((data) => (res = data))
    .catch((error) => {
      throw new Error(error);
    });

  return res;
}

bootstrap();
