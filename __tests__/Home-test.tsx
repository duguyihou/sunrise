/**
 * @format
 */

import 'react-native'
// Note: test renderer must be required after react-native.
import eventReducer from 'app/calendarEventsSlice'
test('should return the initial state', () => {
  expect(eventReducer(undefined, { type: String, payload: String })).toEqual([
    {
      id: '1231j1nunjn',
      summary: 'Google I/O 2015',
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: '2015-05-28T09:30:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2015-05-28T17:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      notification: '',
    },
    {
      id: 'asjidj8q81ji12i',
      summary: 'Google I/O 2016',
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: '2015-05-28T13:00:00-15:45',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2015-05-28T17:00:00-19:00',
        timeZone: 'America/Los_Angeles',
      },
      notification: '',
    },
  ])
})
