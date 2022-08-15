import React, {useEffect, useRef, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {concat} from 'lodash'
import "../../style/App.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css"
import {calculateDaysDiff, errAlert} from "../common/utils";
import {getAllEvents, updateEventRange} from "../services/events_service";
import md5 from "md5";
import {Button, Space} from "antd";
import {AddEventModal} from "../calender/actions/AddEventModal";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const Calender2 = () => {

  const [events, setEvents] = useState();
  const [nonce, setNonce] = useState(0);
  const [addModalOpen, isAddModalOpen] = useState(false);

  const eventsMapper = useRef({});
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsFromDb = await getAllEvents();
      const const_events = [];

      for (let ev of eventsFromDb) {
        let eventItem = {
          start: moment(ev.start).toDate(),
          end: moment(ev.end).toDate(),
          title: ev.name,
        };
        const_events.push(eventItem);
        eventsMapper.current[eventKeyGenerator(eventItem.start, eventItem.end,
            eventItem.title)] = ev._id;
      }
      setEvents(const_events)
    }

    fetchEvents()
    .catch((e) => {
      errAlert(e.toString());
    });

  }, [nonce])

  const eventKeyGenerator = (start, end, title) => {
    return md5(concat(start, end, title))
  }

  const onEventResize = (data) => {
    doUpdate(data);
  };

  const onEventDrop = (data) => {
    doUpdate(data);
  };

  function doUpdate(data) {
    let event = data.event;
    const event_id = eventsMapper.current[eventKeyGenerator(event.start,
        event.end, event.title)];
    const {start, end} = data;
    updateDB(event_id, start, end);
    setNonce(x => x + 1);
  }

  const updateDB = async (id, start, end, name) => {
    let u = await updateEventRange(id, start, end).catch((e) => {
      errAlert(e.toString());
    });

  }

  return (
      <Space size={100}>
        <div>
          <Button type="primary" danger onClick={() => isAddModalOpen(true)}>Add
            new Event</Button>
        </div>

        <div className="App">
          <DnDCalendar
              defaultDate={moment().toDate()}
              defaultView="month"
              events={events}
              localizer={localizer}
              onEventDrop={onEventDrop}
              onEventResize={onEventResize}
              resizable
              style={{height: "100vh"}}
          />
        </div>

        <AddEventModal addModalOpen={addModalOpen}
                       isAddModalOpen={isAddModalOpen}
                       onAddEvent={(newEventStartDate) => console.log(newEventStartDate)}/>
      </Space>
  );
}

