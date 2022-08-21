import API from "../../API";
import {isAllDayEvent} from "../common/utils";

export const getAllEvents = async () => {
  return API.get(
      `events/find_all`)
  .then(response => {
    if (response.data.errors) {
      throw Error(response.data.errors)
    }
    return response.data.result;
  })
}

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

export const createNewEvent = async (startDate, endDate, title) => {
  return API.post('events/add_event',
      {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        title: title,
        allDay:isAllDayEvent(startDate,endDate)
      }
  ).then(response => {
    if (response.data.errors) {
      throw Error(response.data.errors)
    }
    return response.data.result;
  })
}

export const updateEvent = async (id, startDate, endDate, title) => {

  return API.put('events/update_event',
      {
        id: id,
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        title: title,
        allDay:isAllDayEvent(startDate,endDate)
      }
  ).then(response => {
    if (response.data.errors) {
      throw Error(response.data.errors)
    }
    return response.data.result;
  })

}

export const updateEventRange = async (id, startDate, endDate) => {

  return API.put('events/update_event_range',
      {
        id: id,
        startDate: startDate.getTime(),
        endDate: endDate.getTime()
      }
  ).then(response => {
    if (response.data.errors) {
      throw Error(response.data.errors)
    }
    return response.data.result;
  })

}

