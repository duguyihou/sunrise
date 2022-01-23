/**
 * @format
 */

import 'react-native'
// Note: test renderer must be required after react-native.
import eventReducer from 'app/eventsSlice'
test('should return the initial state', () => {
  expect(eventReducer(undefined, { type: String, payload: String })).toEqual([
    'a',
    'b',
  ])
})
