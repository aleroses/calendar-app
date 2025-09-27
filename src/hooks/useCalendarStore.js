import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(
    (state) => state.calendar
  );

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Access the backend
    // TODO: OK
    if (calendarEvent._id) {
      // Uppdating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creating
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
        })
      );
    }
  };

  return {
    // Properties
    events,
    activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
  };
};
