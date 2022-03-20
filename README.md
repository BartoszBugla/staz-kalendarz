<!-- -->

# Calendar intern :date:

## General info :information_source:

Simple calendar app made with react.
Preview : https://staz-kalendarz.vercel.app

## Technologies :hammer_and_wrench:

Project made with :

- next-js: 12.1.0
- react: 17.0.2
- react-bootstrap: ^2.2.1
- typescript : 4.6.2
- context api

## Setup :gear:

You can install repository locally and run commands:

```
$ cd ../calendar
$ npm install
$ npm run dev
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`]
(https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features :star:

Client :sassy_man: :

- Book meeting, by choosing time and enter data.

Advisor :man_judge::

- Add and delete slots possible to be booked
- Accept and reject booking.
- See slots free, on hold, booked.
- Perform actions on multiple days

## Initializing files :checkered_flag:

day_id = "year-month-date"
month is counted from 0 and date from 1

To init with advisor_slots.json:

- /logged

To init with free_slots.json:

- /

#### advisor_slots.json

Data structure is:

```
day_id: [
    {
    "id": day_id_hour:minute,
    "hour":  number from 0 to 23
    "minute": number from 0 to 59
    "onHold": boolean,
    "date": day_id,
    "available": boolean
      // if onHold is false and available
      // is free  info is not necessary
    "info": {
        "description": string
        "name": string
        "second": string
        "email": email
      },

    }
  ]
```

#### free_slots.json

Data structure is:

```
   day_id: [
    {
      "id": day_id_hour:minute,
      "hour":  number  0-23
      "minute": number 0-59
      "onHold": boolean,
      "date": day_id,
    }
  ]

```
