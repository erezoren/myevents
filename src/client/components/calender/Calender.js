import React, {useEffect, useState} from "react";
import {Header} from "./Header";
import {DisplayMode} from "../common/app_constants";
import date from 'date-and-time';

import '../../style/Calender.css';
import {CalenderDays} from "./CalenderDays";
import {getEventsByStartDateAndDisplayModeDate} from "../services/events_service";
import {
  calcEndDateByStartDateAndDisplayMode,
  calculateDaysDiff,
  errAlert,
  resetDateToDayBeginning,
  resetDateToDayEnd
} from "../common/utils";
import {Spin} from "antd";

export const Calender = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  const [events, setEvents] = useState([]);
  const [displayMode, setDisplayMode] = useState(DisplayMode.day);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchEvents = async () => {
      let endDate = calcEndDateByStartDateAndDisplayMode(startDate,
          displayMode);
      let resetDateToDayEnd1 = resetDateToDayEnd(endDate);
      setEndDate(resetDateToDayEnd1)

      const eventsFromDb = await getEventsByStartDateAndDisplayModeDate(
          resetDateToDayBeginning(startDate), endDate);
      setEvents(eventsFromDb);
      setLoading(false);
    }
    fetchEvents()
    .catch((e) => {
      setLoading(false);
      errAlert(e.toString());
    });

  }, [startDate, displayMode])

  return (
      <>
        <Header
            startDate={startDate}
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
            changeDate={(change) => {
              setStartDate(
                  date.addDays(startDate, change))
            }}
        />
        <hr/>
        {loading && <Spin size="large"/>}
        {!loading && <CalenderDays startDate={startDate} endDate={endDate}
                                   events={events}
                                   onEventUpdate={(newEventStartDate) =>
                                       setStartDate(date.addDays(startDate,
                                           calculateDaysDiff(startDate,
                                               newEventStartDate))
                                       )}/>}
      </>
  )
}