import {
  calendarSlice,
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Tests in the calendarSlice", () => {
  test("Should return the default state.", () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent should activate the event.", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    // console.log(state);

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent should add the event.", () => {
    const newEvent = {
      id: "3",
      start: new Date("2020-10-21 13:00:00"),
      end: new Date("2020-10-21 15:00:00"),
      title: "Ale's birthday!!!",
      notes: "Buy cake...",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    // console.log(state);

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent should update the event.", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2020-10-21 13:00:00"),
      end: new Date("2020-10-21 15:00:00"),
      title: "Ale's birthday updated!!!",
      notes: "Buy cake...updated",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    // console.log(state);

    expect(state.events).toContain(updatedEvent);
  });
});
