import { LoggerTransport } from 'nest-logger';

export default () => (
{
    port: parseInt(process.env.PORT, 10) || 3000,
    logging: {
        logLevel: process.env.LOG_LEVEL || 'debug',
        serviceName: process.env.SERVICE_NAME || 'multicuenta',
        logAppenders: [LoggerTransport.CONSOLE, LoggerTransport.ROTATE],
        logFilePath: process.env.LOG_FILE_PATH || '/shared/logs/multicuenta',
    },
    somedb: {
        host: 'localhost',
        port: 7777,
        user: 'user',
        password: 'pass',
    }
});
