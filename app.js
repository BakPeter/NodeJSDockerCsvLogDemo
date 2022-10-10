const { getLogger, Settings: LoggerSettings } = require('./src/logger');

const envirmentVaraibles = {
  enableLogger: process.env.enableLogger === 'true' ? true : false,
  serverUrl: process.env.serverUrl,
  datePattern: process.env.datePattern,
  zippedArchive: process.env.zippedArchive,
  maxSize: process.env.maxSize,
  maxFiles: process.env.maxFiles,
  extension: process.env.extension,
};
let settings = require('./src/configuration/settings.json');
settings.envirmentVaraibles = envirmentVaraibles;
settings.loggerSettings = { ...settings.loggerSettings, ...envirmentVaraibles };
const loggerSettings = new LoggerSettings({
  applicationName: settings.applicationName,
  ...settings.loggerSettings,
});
const logger = getLogger(loggerSettings);

logger.info(`${settings.applicationName} is up`, { addedData: { settings } });
console.log(`${settings.applicationName} is up`, { addedData: settings });

let i = 0;
setInterval(() => {
  i++;
  const data = {
    itaration: i,
    message: `#${i} Message from ${settings.applicationName}`,
  };

  if (i % 100 === 0) {
    logger.warn(`${data.message}`, {
      addedData: {
        settings,
        p1: {
          data,
          settings1: settings,
          data1: data,
          settings2: settings,
          data2: data,
          settings3: settings,
          data3: data,
          settings4: settings,
          data4: data,
          settings4: settings,
          data4: data,
          settings5: settings,
          data5: data,
          settings6: settings,
          data6: data,
          settings7: settings,
          data7: data,
        },
      },
    });
  }

  if (i % 150 === 0) {
    logger.error(`${data.message}`, {
      addedData: {
        settings,
        p1: {
          data,
          settings1: settings,
          data1: data,
          settings2: settings,
          data2: data,
          settings3: settings,
          data3: data,
          settings4: settings,
          data4: data,
          settings4: settings,
          data4: data,
          settings5: settings,
          data5: data,
          settings6: settings,
          data6: data,
          settings7: settings,
          data7: data,
        },
      },
    });
  }

  logger.info(`${data.message}`, {
    addedData: {
      settings,
      p1: {
        data,
        settings1: settings,
        data1: data,
        settings2: settings,
        data2: data,
        settings3: settings,
        data3: data,
        settings4: settings,
        data4: data,
        settings4: settings,
        data4: data,
        settings5: settings,
        data5: data,
        settings6: settings,
        data6: data,
        settings7: settings,
        data7: data,
      },
    },
  });
}, settings.logInterval);

setTimeout(() => {
  throw 'Error test demo';
}, 30000);
