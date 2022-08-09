import {DisplayMode} from "./app_constants";
import date from "date-and-time";
import * as Swal from "sweetalert2";
import errorImage from '../../images/error.png'

export const calcEndDateByStartDateAndDisplayMode = (startDate,
    displayMode) => {

  let clonedDate = new Date(startDate.getTime());
  let endDate = undefined;
  switch (displayMode) {
    case DisplayMode.week: {
      endDate = date.addDays(clonedDate, 6);
      break;
    }
    case DisplayMode.month: {
      endDate = date.addMonths(clonedDate, 1);
      break;
    }
    default: {
      endDate = clonedDate;
    }

  }
  return endDate;
}

export const resetDateToDayBeginning = (date) => {
  date.setHours(0, 0, 0, 0);
  return date;
}

export const resetDateToDayEnd = (date) => {
  date.setHours(23, 59, 59, 0);
  return date;
}

export const isAllDayEvent = (startDate, endDate) => {
  const msInHour = 1000 * 60 * 60;
  return Math.round(Math.abs(endDate - startDate) / msInHour) == 24;
}

export const errAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: message,
    imageUrl: errorImage,
    imageWidth: 400,
    imageHeight: 200,
  })
}

export const calculateDaysDiff=(oldEventStartDate,newEventStartDate)=> {
  let diffInMs = new Date(
      newEventStartDate).getTime() - oldEventStartDate.getTime();
  return Math.floor(diffInMs / (1000 * 3600 * 24))
}