import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

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
    try {
      if (calendarEvent.id) {
        // Updating
        await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );

        dispatch(onUpdateEvent({ ...calendarEvent, user }));

        return;
      }
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
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error saving.",
        error.response.data.msg,
        "error"
      );
    }
  };

  const startDeletingEvent = async () => {
    // TODO: Access the backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);

      Swal.fire(
        "Error while deleting.",
        error.response.data.msg
      );
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.events);

      dispatch(onLoadEvents(events));

      // console.log({ data, events });
    } catch (error) {
      console.log("Error loading events.");
      console.log(error);
    }
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
