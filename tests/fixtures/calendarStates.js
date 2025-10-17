export const events = [
  {
    id: "1",
    start: new Date("2022-10-21 13:00:00"),
    end: new Date("2022-10-21 15:00:00"),
    title: "The Ale's birthday.",
    notes: "Buy cake and gift.",
  },
  {
    id: "2",
    start: new Date("2022-11-21 13:00:00"),
    end: new Date("2022-11-21 15:00:00"),
    title: "The Ivo's birthday.",
    notes: "Buy cake and gift.",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: {
    ...events[0],
  },
};
