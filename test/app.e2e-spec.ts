import { ItemsRepository } from 'repositories/items.repository';
import { Connection } from '../src/repositories/somedb/connection.somedb';
import { SomeDBModule } from '../src/repositories/somedb/somedb.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'app.module';
import { HttpExceptionFilter } from 'utils/http-exception.filter';
import { ErrorFilter } from 'utils/error.filter';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as casual from 'casual';
import { RepositoriesModule } from 'repositories/repositories.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let conn: Connection;
  let entityRepository: ItemsRepository;

  process.env.SOMEDB_HOST = "localhost";
  process.env.SOMEDB_PORT = "7687";
  process.env.SOMEDB_USER = "neo4j";
  process.env.SOMEDB_PASS = "neo4j";

  beforeAll(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SomeDBModule, RepositoriesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new ErrorFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    conn = app.get<Connection>(Connection);
    entityRepository = app.get<ItemsRepository>(ItemsRepository);
    await entityRepository.deleteAll();
    done();
  });

  afterAll(async (done) => {
    await conn.getDriver().close();
    await app.close();
    done();
  });

  describe('scenary01', () => {
    let id00 = casual.uuid;
    let id01_01 = casual.uuid;
    let id01_02 = casual.uuid;
    let id02_01 = casual.uuid;
    let id02_02 = casual.uuid;
    let id02_03 = casual.uuid;
    let id02_04 = casual.uuid;

    it('Adding Node 00', (done) => {
      request(app.getHttpServer())
      .post('/items')
      .send({
        'id' : id00,
        'type': "NODE",
        'level': '00',
        'name': casual.name,
        'company_name': casual.company_name,
        'address': casual.address,
      })
      .set('Accept', 'application/json')
      .expect(201, done);
    });

    it('Adding Node 01 Level 01', (done) => {
      request(app.getHttpServer())
      .post('/items')
      .send({
        'id' : id01_01,
        'type': "NODE",
        'level': '01',
        'name': casual.name,
        'company_name': casual.company_name,
        'address': casual.address,
      })
      .set('Accept', 'application/json')
      .expect(201, done);
    });

    it('Adding Node 02 Level 01', (done) => {
      request(app.getHttpServer())
      .post('/items')
      .send({
        'id' : id01_02,
        'type': "NODE",
        'level': '01',
        'name': casual.name,
        'company_name': casual.company_name,
        'address': casual.address,
      })
      .set('Accept', 'application/json')
      .expect(201, done);
    });

    it('Adding Node 01 Level 02', (done) => {
      request(app.getHttpServer())
      .post('/items')
      .send({
        'id' : id02_01,
        'type': "NODE",
        'level': '02',
        'name': casual.name,
        'company_name': casual.company_name,
        'address': casual.address,
      })
      .set('Accept', 'application/json')
      .expect(201, done);
    });

    it('Adding Node 02 Level 02', (done) => {
      request(app.getHttpServer())
      .post('/items')
      .send({
        'id' : id02_02,
        'type': "NODE",
        'level': '02',
        'name': casual.name,
        'company_name': casual.company_name,
        'address': casual.address,
      })
      .set('Accept', 'application/json')
      .expect(201, done);
    });

    it('Adding Node 03 Level 02', (done) => {
      request(app.getHttpServer())
      .post('/items')
      .send({
        'id' : id02_03,
        'type': "NODE",
        'level': '02',
        'name': casual.name,
        'company_name': casual.company_name,
        'address': casual.address,
      })
      .set('Accept', 'application/json')
      .expect(201, done);
    });

    it('Adding Node 04 Level 02', (done) => {
      request(app.getHttpServer())
      .post('/items')
      .send({
        'id' : id02_04,
        'type': "NODE",
        'level': '02',
        'name': casual.name,
        'company_name': casual.company_name,
        'address': casual.address,
      })
      .set('Accept', 'application/json')
      .expect(201, done);
    });

    it('Get Nodes from level01 Expected Count 2', (done) => {
      request(app.getHttpServer())
      .get(`/items?filter={"level":"01"}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body.data.length).toBe(2);
        done();
      });
    });

    it('Updating name of Root Node to ROOT', (done) => {
      request(app.getHttpServer())
      .put(`/items/${id00}`)
      .send({
        'name': 'ROOT',
        'level': '00',
      })
      .expect(200, done);
    });

    it('Deleting Root Node', (done) => {
      request(app.getHttpServer())
      .delete(`/items/${id00}`)
      .expect(204, done);
    });

  });
});
