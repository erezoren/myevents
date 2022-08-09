import React, {useEffect, useState} from 'react';
import {cloneDeep} from "lodash";
import {DragList} from "./dnd/DragList";
import date from 'date-and-time';
import {isUndefined} from 'lodash'
import {resetDateToDayBeginning} from "../common/utils";

export const CalenderDays = ({startDate, endDate, events,onEventUpdate}) => {
  const [datedEvents, setDatedEvents] = useState({});

  const cloneAndAggregateEvents = () => {
    let aggregatedEventsMap = {};
    for (let dayOfPeriod = startDate; dayOfPeriod <= endDate;
        dayOfPeriod = date.addDays(dayOfPeriod, 1)) {
      aggregatedEventsMap[dayOfPeriod.toDateString()] = [];
    }
    events.map(e => {
      let clonedEvent = cloneDeep(e)
      if(isUndefined(aggregatedEventsMap)){
        aggregatedEventsMap={};
      }
      aggregatedEventsMap[resetDateToDayBeginning(
          new Date(clonedEvent.start)).toDateString()].push(e);
    })
    return aggregatedEventsMap;
  }

  const isAllDayEvent = (e) => {
    return new Date(e.start).getTime() > new Date(e.start).getTime();
  }

  useEffect(() => {
    if (endDate && endDate.getTime() < startDate.getTime()) {
      return;
    }
    let clonedAggregatedEvents = cloneAndAggregateEvents();
    Object.keys(clonedAggregatedEvents)
    .forEach(date => {
      clonedAggregatedEvents[date].sort((e1, e2) => {
        return new Date(e1.start) - new Date(e2.start);
      })
    })
    setDatedEvents(clonedAggregatedEvents);
  }, [startDate, endDate, events]);

  return (
      <div>
        <DragList datedEvents={datedEvents} onEventUpdate={onEventUpdate}/>
      </div>

  );

}
