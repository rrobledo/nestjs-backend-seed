import { LoggerTransport } from 'nest-logger';

export default () => (
{
    port: parseInt(process.env.PORT, 10) || 3000,
    logging: {
        logLevel: 'debug',
        serviceName: 'multicuenta',
        logAppenders: [LoggerTransport.CONSOLE, LoggerTransport.ROTATE],
        logFilePath: '/shared/logs/multicuenta',
    },
    somedb: {
        host: 'localhost',
        port: 7777,
        user: 'user',
        password: 'pass',
    }
});
