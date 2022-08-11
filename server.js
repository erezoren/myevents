const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const config = require('config');
const connectMongodb = require("./src/server/db/connection");
const eventsDbConfig = config.get('Events.dbConfig');

const app = express();
app.use(cors());

const indexRouter = require('./src/server/routes/index');
const eventsRouter = require('./src/server/routes/events');

const port = process.env.PORT || 8080;


app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  console.log(process.env.NODE_ENV)
  connectMongodb(eventsDbConfig).then(() => {
    console.info("Events Mongodb connected");
  });
});

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  next()
})

app.use('/api/status', indexRouter);
app.use('/api/events', eventsRouter);

app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

