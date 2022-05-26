import { existsSync, mkdirSync } from "fs";
import moment from "moment";
import path from "path";
import winston from "winston";

// create log file
if (!existsSync(path.resolve(__dirname, `../logs`))) {
  mkdirSync(path.resolve(__dirname, `../logs`));
}

export default winston.createLogger({
  // level: config.logs.level,
  // levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `[${moment(info.timestamp).format("YYYY-MM-DD HH:mm:ss")}] ${info.level}: ${info.message}`)
  ),
  transports: [
    // info console log
    new winston.transports.Console(),
    // info log file
    new winston.transports.File({
      filename: path.resolve(__dirname, `../logs/${moment().format("YYYY-MM-DD HH")}-00.log`)
    })
  ],
  exitOnError: false
});
