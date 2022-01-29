/**
 * @format
 */

import 'react-native'
// Note: test renderer must be required after react-native.
import eventReducer from 'app/calendarEventsSlice'
test('should return the initial state', () => {
  expect(eventReducer(undefined, { type: String, payload: String })).toEqual([
    {
      id: '12312',
      summary: 'Google I/O 2015',
      description: "A chance to hear more about Google's developer products.",
      notification: '2015-05-28T09:30:00-07:00',
    },
    {
      id: '12321',
      summary: 'Google I/O 2016',
      description: "A chance to hear more about Google's developer products.",
      notification: '2015-05-28T13:00:00-15:45',
    },
  ])
})
