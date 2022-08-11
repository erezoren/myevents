# my-calender
### Overview
* This application is a simple client-server events manager
* Events can be added and updated.
* Events data is persisted to a local contained MongoDB with one collection called 'events'.
* Events Are draggable and droppable, though this feature (using react-beautiful-dnd by Atlassian)
Is still not working as expected and need to be fixed.



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