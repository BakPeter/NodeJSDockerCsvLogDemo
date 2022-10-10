const winston = require('winston');

require('winston-daily-rotate-file');
const { SeqTransport } = require('@datalust/winston-seq');

const getLogger = (settings) => {
  if (settings.enableLogger) {
    const mountDir = '/usr/src/app/logs/';

    const myCsvFormat = winston.format.printf(
      ({ level, message, application, timestamp, addedData }) => {
        return `${timestamp};${application};${level};${message};${JSON.stringify(
          addedData
        )}`;
      }
    );

    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        /* This is required to get errors to log with stack traces. See https://github.com/winstonjs/winston/issues/1498 */
        winston.format.errors({ stack: true }),
        myCsvFormat
        // winston.format.json(),
        // winston.format.simple()
      ),
      defaultMeta: {
        application: `${settings.applicationName}.${settings.serviceName}`,
      },
      transports: [
        new winston.transports.DailyRotateFile({
          level: settings.level,
          filename: mountDir + settings.fileName + '.%DATE%',
          datePattern: settings.datePattern,
          zippedArchive: settings.zippedArchive,
          maxSize: settings.maxSize,
          maxFiles: settings.maxFiles,
          extension: settings.extension,
          handleExceptions: true,
          handleRejections: true,
        }),
        new winston.transports.DailyRotateFile({
          level: 'warn',
          filename: mountDir + settings.fileName + '.ERRORS.%DATE%',
          datePattern: settings.datePattern,
          zippedArchive: settings.zippedArchive,
          maxSize: settings.maxSize,
          maxFiles: settings.maxFiles,
          extension: settings.extension,
          handleExceptions: true,
          handleRejections: true,
        }),
        new winston.transports.File({
          filename: mountDir + settings.fileName + '.log',
          handleExceptions: true,
          handleRejections: true,
        }),
        new winston.transports.Console({
          handleExceptions: true,
          handleRejections: true,
        }),
        new SeqTransport({
          serverUrl: settings.serverUrl,
          // apiKey: 'FEvn39ftwXUZxBqsMo4s0',
          onError: (e) => {
            console.error(e);
          },
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
    });
  }

  return new EmptyLogger();
};

class EmptyLogger {
  log() {}
  error() {}
  warn() {}
  info() {}
  http() {}
  verbose() {}
  debug() {}
  silly() {}
}

module.exports = { getLogger };
