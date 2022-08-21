const mongoose = require('mongoose');
const Events = require('./model/events')


const findAllEvents = async () => {
  return Events.find({});
}

const findEventsByDateRange = async (startDate, endDate) => {
  return Events.find({
    start: {
      $gte: new Date(Number(startDate))
    },
    end: {
      $lte: new Date(Number(endDate))
    },
  });
}

const addNewEvent = async (startDate, endDate, title,allDay) => {
  return Events.insertMany([{
        start: new Date(startDate),
        end: new Date(endDate),
        title: title,
        allDay:allDay
      }]
  );
}

const updateEvent = async (id, startDate, endDate, title,allDay) => {
  const filter = {_id: id};
  return Events.findOneAndUpdate(filter,
      {
        start: new Date(startDate),
        end: new Date(endDate),
        title: title,
        allDay:allDay
      }
  );
}

const updateEventRange = async (id, startDate, endDate) => {
  const filter = {_id: id};
  return Events.findOneAndUpdate(filter,
      {
        start: new Date(startDate),
        end: new Date(endDate)
      }
  );
}


module.exports = {
  findAllEvents:findAllEvents,
  findEventsByDateRange: findEventsByDateRange,
  addNewEvent: addNewEvent,
  updateEvent: updateEvent,
  updateEventRange:updateEventRange
}