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

export const getCurrentDayName = () => dayjs().format('ddd')
export const getCurrentDay = () => dayjs().format('DD')
