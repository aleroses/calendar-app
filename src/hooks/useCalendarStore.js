import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(
    (state) => state.calendar
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Access the backend

    // TODO: Update event
    if (calendarEvent._id) {
      // Uppdating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creating
      const { data } = await calendarApi.post(
        "/events",
        calendarEvent
      );
      // console.log({data});

      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user,
        })
      );
    }
  };

  const startDeletingEvent = () => {
    // TODO: Access the backend
    dispatch(onDeleteEvent());
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
