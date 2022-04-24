# Node.js Movie Service

This repository has 2 services

1. The Movie Service
2. The Authentication Service.

## Technical Tools:

- **Server**: NodeJs, ExpressJs, Babel.

- **Database**: Mysql, Sequelize ORM.

- **Test**: Jest

# Steps

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Clone and run the project

1. Clone the repository

```
  git clone <this_repo>
```

2. Run docker images from docker-compose file, by default auth service has port 3000, and movies service port 3050

```
  docker-compose -f docker-compose.yml build
  docker-compose -f docker-compose.yml up -d
```

3. To stop the authorization service run

```
docker-compose down
```

# Auth Service

## Generate token from auth service

`POST /auth` return the token based on the specified user credentials

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Request Simulation

To authorize user call the auth service using for example `curl`. The auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

# Movies Service

After generating the token key, you can perform the following requests

## `POST /movies`

To create a new movie you have to provide the parameter title which indicates the name of the movie.

**_NB:_** if the name not provided or the movie is not exist it will return a status code 400 which indicates a lack of information

1.  Example request

```
  curl --location --request POST 'http://localhost:3050/api/movies' \
 --header 'Authorization: Bearer ${token}' \
 --header 'Content-Type: application/json' \
 --data-raw '{
     "title": "The avengers"
 }'
```

2.  Example response with status code 201.

```
 "success": true,
 "newMovie": {
     "id": 34,
     "userId": 123,
     "Title": "The Avengers",
     "Released": "04 May 2012",
     "Genre": "Action, Adventure, Sci-Fi",
     "Director": "Joss Whedon",
     "updatedAt": "2022-04-24T02:45:31.297Z",
     "createdAt": "2022-04-24T02:45:31.297Z"
     }
 }
```

**_NB:_**

- `Basic` users are restricted to create 5 movies per month (calendar
  month).
- `Premium` users have no limits.

## `GET /movies` to fetch a list of movies created by user

To retrieve the list of movies created by the user, you must provide the generated token for that user.

**_NB:_**

- if the provided token is invalid or has expired, the response will be 401 which indicates unauthorized access.

1.  Example request

```
  curl --location --request GET
  'http://localhost:3050/api/movies' \
  --header '${token}'
```

2.  Example response with status code 201.

```
 {
    "success": true,
    "movies": [
        {
            "id": 1,
            "userId": 123,
            "Title": "The Batman",
            "Released": "04 Mar 2022",
            "Genre": "Action, Crime, Drama",
            "Director": "Matt Reeves",
            "createdAt": "2022-03-23T14:17:40.000Z",
            "updatedAt": "2022-04-23T14:17:40.000Z"
        },
        {
            "id": 19,
            "userId": 123,
            "Title": "Slime",
            "Released": "30 Jun 2017",
            "Genre": "Short, Horror",
            "Director": "Ceus Rob, Inge Vanleene",
            "createdAt": "2022-04-23T15:19:56.000Z",
            "updatedAt": "2022-04-23T15:19:56.000Z"
        },
        {
            "id": 34,
            "userId": 123,
            "Title": "The Avengers",
            "Released": "04 May 2012",
            "Genre": "Action, Adventure, Sci-Fi",
            "Director": "Joss Whedon",
            "createdAt": "2022-04-24T02:45:31.000Z",
            "updatedAt": "2022-04-24T02:45:31.000Z"
        }
    ]
}
```

# Run the tests

```
  cd movies
  npm run test
```

# Postman Collection

https://www.getpostman.com/collections/693ee3451f2612294e14

# Scripts

- `npm run dev`: Run project in mode watch for the dev.
- `npm start`: Run project without watching.
- `npm run migrate`: Run migrations manually.
- `npm run test`: Run the tests without watching.
- `npm run test:watch`: Run the test in test mode watch.

# Portainer interface

Use the Portainer interface to gain more access to your Docker images via:
http://localhost:9000/#!/auth
