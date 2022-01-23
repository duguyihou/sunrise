import dayjs from 'dayjs'

export const dateFormat = (dateTime: string, format = 'h:mm:a') =>
  dayjs(dateTime).format(format)
