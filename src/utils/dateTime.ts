import dayjs from 'dayjs'

export const dateFormat = (dateTime: string, format = 'h:mm:a') =>
  dayjs(dateTime).format(format)

export const currentMonth = () => dayjs().format('MMMM YYYY')
