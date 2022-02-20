import dayjs from 'dayjs'
import { Day } from 'typings/day'

export const dateFormat = (dateTime: string, format = 'h:mm:a') =>
  dayjs(dateTime).format(format)

export const getCurrentMonth = () => dayjs().format('MMMM YYYY')

export const getCurrentDayName = (number = 0) =>
  dayjs().add(number, 'day').format('ddd')

export const getCurrentDay = (number = 0) =>
  dayjs().add(number, 'day').format('DD')

export const getNextDays = (number = 0) => {
  if (number === 0)
    return [{ day: getCurrentDay(), dayName: getCurrentDayName() }]
  let days: Day[] = []
  for (let i = 0; i < number; i++) {
    const day = {
      day: Number(getCurrentDay(i)),
      dayName: getCurrentDayName(i),
    }
    days = [...days, day]
  }
  return days
}

export const getDue = (date: Date) => dayjs(date).format('ddd, DD-MM-YYYY')
