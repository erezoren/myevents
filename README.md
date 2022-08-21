# my-calendar
### Overview
* This application is a simple client-server events manager with 2 modes:
  * New Calendar (default) - using  [react-big-calender](https://www.npmjs.com/package/react-big-calendar).
  * Old Calendar - using my own controller for displaying events.
* In both calenders Events can be added and updated.
  * To add a new event click and drag over the timeframe you want. then enter the event title and click 'OK'.
  * To Update an event timeframe click the event bottom and drag.
  * To update an event title click the event body once, change the title in the opened modal and click 'Update'
* Events data is persisted to a local contained MongoDB with one collection called 'events'.

### HOWTO
* To add a new event in the new calendar either click on the calendar and drag through the timeframe you want, or use the Add EVent button.


### Assumptions
- node 16 or higher installed.
- docker installed.
- yarn installed

## Run from dev environment:
- Clone the project from git.
- Move to project root
- In the command line run `docker-compose up events_mongodb` to start mongo container.
- In the command line run `yarn` to install dependencies.
- Launch client and server by executing `yarn dev`

### Run fully Dockerized application
from the application root execute:
```shell
docker-compose up --build
```

once container is up and running, in your browser go to:
http://localhost:3000/

stop dockerized application

```shell
docker-compose down -v
```

Stop all docker containers
```shell
 docker stop $(docker ps -a -q)
```
Rmove all docker containers
```shell
 docker rm $(docker ps -a -q)
```

## What is missing?
- Application should have tests.
- DB credentials should not be exposed, but at least set as environment variables.
- For this use case it is probably better to use mongo as a time series db, instead 
of finding events by dates, it will be more compact and much faster.
- An option to delete an event.
- Drag N Drop does not work as i expect.