import { Test, TestingModule } from '@nestjs/testing';
import configuration from './config/configuration';

import { LoggerModule } from 'utils/logger.module';
import { ConfigModule } from '@nestjs/config';
import * as MongoParse from 'mongo-parse';

describe('Garage', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, 
                ConfigModule.forRoot({
                  load: [configuration],
                })],
      controllers: [],
      providers: [],
      exports: [],
    }).compile();
    
  });

  describe('garage', () => {
    it('mongoparser', async () => {

      let getTypeAsString = (data): string => {
        switch(typeof data) {
          case "string":
            return `'${data.toString()}'`;
          default:
            return data.toString();
        }

      }

      let iterateParts = (parts): string => {
        let ret: string = "";

        parts.forEach(part => {
          switch(part.operator) {
            case "$and":
              let andOperand = "";
              part.parts.forEach(andPart => {
                andOperand = andOperand.concat(iterateParts(andPart.parts), " AND ")
              });
              ret = ret.concat(`(${andOperand.substr(0, andOperand.length - 5)})`);
              break;
            case "$or":
              let orOperand = "";
              part.parts.forEach(orPart => {
                orOperand = orOperand.concat(iterateParts(orPart.parts), " OR ")
              });
              ret = ret.concat(`(${orOperand.substr(0, orOperand.length - 5)})`);
              break;
            case "$eq":
              ret = `${part.field} = ${getTypeAsString(part.operand)}`;
              break;
            case "$ne":
              ret = `${part.field} <> ${getTypeAsString(part.operand)}`;
              break;
            case "$gt":
              ret = `${part.field} > ${getTypeAsString(part.operand)}`;
              break;
            case "$gte":
              ret = `${part.field} >= ${getTypeAsString(part.operand)}`;
              break;
            case "$lt":
              ret = `${part.field} < ${getTypeAsString(part.operand)}`;
              break;
            case "$lte":
              ret = `${part.field} <= ${getTypeAsString(part.operand)}`;
              break;
            case "$in":
              let inOperand = part.operand.reduce((acc, val) => getTypeAsString(acc).concat(",", getTypeAsString(val)));
              ret = `${part.field} IN (${inOperand})`;
              break;
            default:
          }
        });
        return ret;
      }

      var query = MongoParse.parse(JSON.parse('{ "powerlevel": { "$gt": 9000 }}'));
      // query.parts contains: [{field: 'powerlevel', operator: '$gt', operand: 9000}]

      let date = (new Date()).toISOString();
      let queryStr = `{"$and":[{"userId": "507f191e810c19729de860ea"},  {"animal": {"$in": ["beefalo", "deerclops"]}}, {"date": "${date}"}]}`;
      var newQuery = MongoParse.parse(JSON.parse(queryStr));
      // newQuery is {$and:[{userId: ObjectId("29g8j3h27fh382dh82ae23")}, {animal: {$in: ['beefalo', 'deerclops']}}, {data: "dads"}]}

      let whereQuery = iterateParts(query.parts);
      let whereNewQuery = iterateParts(newQuery.parts);

      let s = "fasdfasdasdfasd"
      let ts = typeof s

      let i = 1
      let is = typeof i

      let b = true
      let bs = typeof b

      expect(true)
    });
  });

});
