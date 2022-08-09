import API from "../../API";
import {isAllDayEvent} from "../common/utils";

export const getEventsByStartDateAndDisplayModeDate = async (startDate,
    endDate) => {
  return API.get(
      `events/find_by_range/start/${startDate.getTime()}/end/${endDate.getTime()}`)
  .then(response => {
    if (response.data.errors) {
      throw Error(response.data.errors)
    }
    return response.data.result;
  })
}

export const createNewEvent = async (startDate, endDate, name) => {
  return API.post('events/add_event',
      {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        name: name,
        allDay:isAllDayEvent(startDate,endDate)
      }
  ).then(response => {
    if (response.data.errors) {
      throw Error(response.data.errors)
    }
    return response.data.result;
  })
}

export const updateEvent = async (id, startDate, endDate, name) => {

  return API.put('events/update_event',
      {
        id: id,
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        name: name,
        allDay:isAllDayEvent(startDate,endDate)
      }
  ).then(response => {
    if (response.data.errors) {
      throw Error(response.data.errors)
    }
    return response.data.result;
  })

}