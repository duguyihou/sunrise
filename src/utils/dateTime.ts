import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { CalendarDay, Day } from 'typings/day'

dayjs.extend(calendar)
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

export const getCalendar = (date: string) =>
  dayjs(date).calendar(null, { sameElse: 'ddd, MMM DD' })

export const isBeforeToday = (date: string) => dayjs(date).isBefore(dayjs())

export const getCalendarDayDate = (calendarDay: CalendarDay) => {
  const { dateString } = calendarDay
  return dayjs(dateString).toISOString()
}
