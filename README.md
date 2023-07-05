## Docker Monorepo Example repository
this project sets a basic react application and a nest js application using a single docker compose file, the goal is to be able to run both projects with a single command

### Setup
- run npm install on the /backend folder
- run npm install on the /frontend folder
- Most of the required setup is performed when running the ```docker-compose up``` command
- Also don't forget of filling your .env file based on .env.example


### Backend
with the application running, run the following npm command in the terminal
```npm run db:run-migrations```

the command should run the migrations of the project in your database and create all the required tables

### Frontend
By running docker-compose up, the frontend should be available at localhost:3001 