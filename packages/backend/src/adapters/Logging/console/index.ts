import winston from 'winston';
import { LoggingPort } from '../../../core/ports/Logging';

export const initAdapter = async (): Promise<LoggingPort> => {
  const { combine, timestamp, label, printf } = winston.format;

  const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level}] ${message}`;
  });

  const logger = winston.createLogger({
    level: 'silly',
    format: combine(timestamp(), myFormat),
    transports: [new winston.transports.Console()],
  });

  const serializer = (value: unknown) => {
    try {
      return JSON.stringify(value);
    } catch (exception: unknown) {
      return Object.prototype.toString.call(value);
    }
  };

  return {
    log: (value, meta) => {
      logger.log({
        level: meta.level,
        message: `[by: ${meta.producerId}] ${serializer(value)}`,
      });
    },
  };
};
