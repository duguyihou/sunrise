import eventsReducer, {
  addCalendarEvent,
  updateCalendatEvent,
} from 'app/calendarEventsSlice'

test('should return the initial state', () => {
  expect(eventsReducer(undefined, {})).toEqual([
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

test('should handle an event being added to an empty list', () => {
  const previousState = []
  expect(
    eventsReducer(
      previousState,
      addCalendarEvent({
        id: '1293849',
        summary: 'Google I/O 2022',
        description: "A chance to hear more about Google's developer products.",
        notification: '2015-05-28T13:00:00-15:45',
      }),
    ),
  ).toEqual([
    {
      id: '1293849',
      summary: 'Google I/O 2022',
      description: "A chance to hear more about Google's developer products.",
      notification: '2015-05-28T13:00:00-15:45',
    },
  ])
})

test('should handle an event being added to an existing list', () => {
  const previousState = [
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
  ]
  expect(
    eventsReducer(
      previousState,
      addCalendarEvent({
        id: '1293849',
        summary: 'Google I/O 2022',
        description: "A chance to hear more about Google's developer products.",
        notification: '2015-05-28T13:00:00-15:45',
      }),
    ),
  ).toEqual([
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
    {
      id: '1293849',
      summary: 'Google I/O 2022',
      description: "A chance to hear more about Google's developer products.",
      notification: '2015-05-28T13:00:00-15:45',
    },
  ])
})

test('should handle an event being updated to an existing event', () => {
  const previousState = [
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
  ]
  expect(
    eventsReducer(
      previousState,
      updateCalendatEvent({
        id: '12312',
        summary: 'Google I/O 2022',
        description: "A chance to hear more about Google's developer products.",
        notification: '2015-05-28T09:30:00-07:00',
      }),
    ),
  ).toEqual([
    {
      id: '12312',
      summary: 'Google I/O 2022',
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
