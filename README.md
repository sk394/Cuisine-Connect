// Recipe Generator/Social App

Steps:
    ```docker compose up -d db``` // start the database
    ```docker ps -a``` // check the status of the database
    ``` docker exec -it db psql -U postgres`` // This command allows you to interactively execute the PostgreSQL command-line interface (psql) inside a running Docker container named db as the user postgres.
    ```CREATE DATABASE socialapp;``` // create a database named socialapp
    ```\l``` // list all databases
    ```\c socialapp``` // connect to the socialapp database
    ```\dt``` // list all tables
    ```CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(50), email VARCHAR(50), password VARCHAR(50));``` // create a table named users
    ```\dt``` // list all tables
    ```INSERT INTO users (name, email, password) VALUES ('Alice', ');``` // insert a user into the users table
    ```SELECT * FROM users;``` // select all users from the users table
    ```\q``` // quit the PostgreSQL command-line interface
    ```docker compose up -d app``` // start the social app
    ```docker ps -a``` // check the status of the social app
    ```curl -X POST -H "Content-Type: application/json" -d '{"name": "Bob", "email": "

## To initiate prisma in the project
```npx prisma init``` // This command initializes Prisma in the project by creating a new directory called prisma with a schema.prisma file inside it.
```npx prisma generate``` // This command generates the Prisma client by reading the schema.prisma file and creating a client that can be used to interact with the database.
```npx prisma db push``` // This command creates the database tables based on the schema defined in the schema.prisma file.
```npx prisma studio``` // This command opens the Prisma Studio interface in the browser, allowing you to interactively explore the database tables and data. 


Everytime backend changes (should be in backend folder)
docker compose build
docker compose up -d backend


everytime you changes frontend code (should be in frontend folder)
docker compose build
docker compose up -d frontend

```

To run all docker containers all at once
docker-compose up --build ( main file)
