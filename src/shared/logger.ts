import DailyRotateFile from 'winston-daily-rotate-file'
/* eslint-disable no-undef */

import path from 'path'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format

//custom log fromat
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return ` ${date.toString()} ${hours}:${minutes}:${seconds} } [${label}] ${level}: ${message} `
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'PH!' }),
    timestamp(),

    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'PH!' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorLogger }

//logs/winston/
//success.log
//error.log
