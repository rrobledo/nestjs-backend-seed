import { Module } from '@nestjs/common';
import { LoggerService, LoggerTransport } from 'nest-logger';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: LoggerService,
      useFactory: (config: ConfigService) => {
        // logLevel: debug, info, warn or error
        // serviceName: daily rotate files will have this name
        // logAppenders: console or rotate or both in array
        // logFilePath: where daily rotate files are saved
        // timeFormat?: winston's time format syntax. Defaults to "YYYY-MM-DD HH:mm:ss".
        // fileDatePattern?: appended to daily rotate filename. Defaults to "YYYY-MM-DD".
        // maxFiles?: how long rotate files are stored. Defaults to "10d" which means 10 days.
        // zippedArchive?: whether to zip old log file. Defaults to false.
        const logLevel = config.get<string>('logging.logLevel');
        const serviceName = config.get<string>('logging.serviceName');
        const logAppenders = config.get<LoggerTransport[]>('logging.logAppenders');
        const logFilePath = config.get<string>('logging.logFilePath');
        return new LoggerService(logLevel, serviceName, logAppenders, logFilePath);
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
