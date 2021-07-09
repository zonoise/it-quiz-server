import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CatsService } from 'src/cats/cats.service';
import { CatsModule } from 'src/cats/cats.module';
import * as yargs from 'yargs';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import * as fs from 'fs';
import { parse } from 'papaparse';

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
  console.log("readFromCsv:",csvData);

  const app = await NestFactory.create(AppModule);
  const catService = app.select(CatsModule).get(CatsService, { strict: true });

  //insert to mongodb
  csvData.forEach((row)=>{
    console.log("row" , row);
    const dto:CreateCatDto = row as CreateCatDto;
    catService.create(dto);
  });
}

//a
async function readFromCsv(csvFile: string) {
  var res = [];
  const rs = fs.createReadStream(csvFile);

  const f = function readCsv(stream: fs.ReadStream) {
    return new Promise<any>((resolve, reject) => {
      parse(stream, {
        header:true,
        complete: (results: any) => {
          console.log(results);
          resolve(results.data);
        }
      });
    });
  }
  
  await f(rs).then((data)=>res=data);
  return res;
}

bootstrap();
