module.exports.Settings = class Settings {
  constructor({
    enableLogger = true,
    applicationName,
    serviceName,
    level = 'debug',
    fileName = null,
    serverUrl = null,
    datePattern = 'YYYY-MM-DD',
    zippedArchive = true,
    maxSize = '20m',
    maxFiles = '10',
    extension = '.log',
  }) {
    this.applicationName = applicationName;
    this.serviceName = serviceName;
    this.level = level;
    this.fileName = fileName;
    this.serverUrl = serverUrl;
    this.enableLogger = enableLogger;
    this.datePattern = datePattern;
    this.zippedArchive = zippedArchive;
    this.maxSize = maxSize;
    this.maxFiles = maxFiles;
    this.extension = extension;
  }
};
