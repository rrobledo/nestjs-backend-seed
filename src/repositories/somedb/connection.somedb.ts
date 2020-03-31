import { Injectable, Scope } from '@nestjs/common';
import { LoggerService } from 'nest-logger';
import { ConfigService } from '@nestjs/config';


@Injectable({ scope: Scope.DEFAULT })
export class Connection {
  protected static driver = null;
  protected static session = null;

  constructor(private readonly config: ConfigService,
              private readonly logger: LoggerService) {
    const host = config.get<string>('somedb.host');
    const port = config.get<number>('somedb.port');
    const user = config.get<string>('somedb.user');
    const password = config.get<string>('somedb.password');
  }

  getDriver() {
    return Connection.driver;
  }

  getSession() {
    return Connection.session;
  }
}
