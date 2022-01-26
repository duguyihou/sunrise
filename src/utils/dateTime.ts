import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
})
export const dateFormat = (dateTime: string, format = 'h:mm:a') =>
  dayjs(dateTime).format(format)

export const getCurrentMonth = () => dayjs().format('MMMM YYYY')

export const getCurrentDayName = (number = 0) =>
  dayjs().add(number, 'day').format('ddd')

export const getCurrentDay = (number = 0) =>
  dayjs().add(number, 'day').format('DD')

interface Day {
  day: number
  dayName: string
}
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
