import DailyRotateFile from 'winston-daily-rotate-file'
/* eslint-disable no-undef */

import path from 'path'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format

//custom log fromat
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return ` ${date.toDateString()} ${hours}:${minutes}:${seconds}  [${label}] ${level}: ${message} `
})

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat,
    // customTimestamp({ format: true }),
    label({ label: 'PH!' })
  ),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), label({ label: 'PH!' }), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ), // by using this "path.join(proccess.cwd())" we will creating working directory here "logs" "winston" "errors"  will create folders here first folder will be logs and winstone folder will create inside logs folder ,error will create inside winstone & last error.log file will create inside errors folder autometicaly when any error will create.
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorLogger }

//logs/winston/
//succeses/success.log
//errors/error.log
