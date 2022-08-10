const mongoose = require('mongoose');
const Events = require('./model/events')

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

const addNewEvent = async (startDate, endDate, name,allDay) => {
  return Events.insertMany([{
        start: new Date(startDate),
        end: new Date(endDate),
        name: name,
        allDay:allDay
      }]
  );
}

const updateEvent = async (id, startDate, endDate, name,allDay) => {
  const filter = {_id: id};
  return Events.findOneAndUpdate(filter,
      {
        start: new Date(startDate),
        end: new Date(endDate),
        name: name,
        allDay:allDay
      }
  );
}


module.exports = {
  findEventsByDateRange: findEventsByDateRange,
  addNewEvent: addNewEvent,
  updateEvent: updateEvent
}