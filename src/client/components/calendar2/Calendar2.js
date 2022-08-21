import React, {useCallback, useEffect, useState} from "react";
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../style/App.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css"
import {errAlert, isAllDayEvent} from "../common/utils";
import {
  createNewEvent,
  getAllEvents,
  updateEvent
} from "../services/events_service";
import {UpdateEventModal} from "../actions/UpdateEventModal";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const Calendar2 = () => {

  const [events, setEvents] = useState();
  const [updateModalOpen, isUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsFromDb = await getAllEvents();
      const const_events = [];

      for (let ev of eventsFromDb) {
        let eventItem = {
          start: moment(ev.start).toDate(),
          end: moment(ev.end).toDate(),
          title: ev.title,
          allDay: ev.allDay,
          _id: ev._id
        };
        const_events.push(eventItem);
      }
      setEvents(const_events)
    }

    fetchEvents()
    .catch((e) => {
      errAlert(e.toString());
    });

  }, [])

  const resizeEvent = useCallback(
      async ({event, start, end}) => {
        let updatedEvent = await updateDB(event._id, start, end, event.title)

        setEvents((prev) => {
          const existing = prev.find((ev) => ev._id === event._id) ?? {}
          const filtered = prev.filter((ev) => ev._id !== event._id)
          let allDay = isAllDayEvent(start, end);
          return [...filtered, {...existing, start, end, allDay}]
        })
      },
      [setEvents]
  )

  const moveEvent = useCallback(
      ({event, start, end, isAllDay: droppedOnAllDaySlot = false}) => {
        updateDB(event._id, start, end, event.title)
        const {allDay} = event
        if (!allDay && droppedOnAllDaySlot) {
          event.allDay = true
        }

        setEvents((prev) => {
          const existing = prev.find((ev) => ev._id === event._id) ?? {}
          const filtered = prev.filter((ev) => ev._id !== event._id)
          return [...filtered, {...existing, start, end, allDay}]
        })
      },
      [setEvents]
  )

  const handleSelectSlot = useCallback(
      async ({start, end}) => {
        const title = window.prompt('New Event title')
        if (title) {
          createNewEvent(start, end, title)
          .then(res => {
            setEvents((prev) => [...prev, {start, end, title, _id: res[0]._id}])
          })
          .catch((e) => {
            errAlert(e.toString());
          });
        }

      },
      [setEvents]
  )

  const handleSelectEvent = useCallback(
      (event) => {
        setSelectedEvent(event)
        isUpdateModalOpen(true);
      },
      []
  )

  const updateDB = async (id, start, end, title) => {
    let updateResponse = await updateEvent(id, start, end, title).catch((e) => {
      errAlert(e.toString());
    });
    return updateResponse;
  }

  function updateEventTitle(updateResponse) {
    setEvents((prev) => {
      const {
        _id,
        start,
        end,
        title,
        allDay
      } = updateResponse;
      const filtered = prev.filter(
          (ev) => ev._id !== updateResponse._id)
      return [...filtered,
        {start, end, title, allDay, _id}]
    })
  }

  return (
      <div>
        <hr/>
        <div className="App">
          <DnDCalendar
              defaultDate={moment().toDate()}
              defaultView={localStorage.getItem("cal-view") || Views.DAY}
              events={events}
              localizer={localizer}
              onEventDrop={moveEvent}
              onEventResize={resizeEvent}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              popup
              resizable
              selectable
              style={{height: "100vh"}}
              onView={(view) => {
                localStorage.setItem("cal-view", view)
              }}
          />
        </div>


        <UpdateEventModal event={selectedEvent}
                          isUpdateModalOpen={isUpdateModalOpen}
                          updateModalOpen={updateModalOpen}
                          showRange={false}
                          onEventUpdate={(updateResponse) => updateEventTitle(
                              updateResponse)}
        />
      </div>
  );
}

