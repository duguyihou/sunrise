/**
 * @format
 */

import 'react-native'
// Note: test renderer must be required after react-native.
import eventReducer from 'app/calendarEventsSlice'
test('should return the initial state', () => {
  expect(eventReducer(undefined, { type: String, payload: String })).toEqual([
    {
      summary: 'Google I/O 2015',
      description: "A chance to hear more about Google's developer products.",
      notification: '',
    },
    {
      summary: 'Google I/O 2016',
      description: "A chance to hear more about Google's developer products.",
      notification: '',
    },
  ])
})
