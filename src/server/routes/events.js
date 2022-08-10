let express = require('express');
const eventsRepository = require('../repository/events_repository')
let router = express.Router();

router.get('/find_by_range/start/:start/end/:end',
    async (req, res) => {
      try {
        const events = await eventsRepository.findEventsByDateRange(
            req.params.start, req.params.end);
        await res.json({result: events});
      } catch (ex) {
        res.json({errors: ex.toString()});
      }

    });

router.post(
    '/add_event',
    async (req, res) => {
      try {
        let body = req.body;
        const event = await eventsRepository.addNewEvent(body.startDate,
            body.endDate,
            body.name,
            body.allDay);
        await res.json({result: event});
      } catch (ex) {
        res.json({errors: ex.toString()});
      }

    });

router.put(
    '/update_event',
    async (req, res) => {
      try {
        let body = req.body;
        const event = await eventsRepository.updateEvent(body.id,
            body.startDate,
            body.endDate,
            body.name,
            body.allDay);
        await res.json({result: event});
      } catch (ex) {
        res.json({errors: ex.toString()});
      }
    }
);

module.exports = router;
