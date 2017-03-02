
Nine Code Challenge - 2017
--------------------------
[![CircleCI](https://circleci.com/gh/lukekaalim/nine-code-challenge.svg?style=shield)](https://circleci.com/gh/lukekaalim/nine-code-challenge/tree/master)

The following repository contains the code Luke Kaalim used in the [9Digital Code Challenge](http://codingchallenge.nine.com.au).
It is currently being host over at [nine-code-challenge.luke.kaal.im](http://nine-code-challenge.luke.kaal.im/)


----------


The repository uses **ExpressJS** the manage the fiddley bits of the server, and **MochaJS** for testing.
Designed for Node **v7.4.0**.


----------


The server can be started with `npm start`, and the tests with `npm test`.  These commands map to `/bin/www.js` and `/bin/test.js` respectively.

`/bin/www.js` first sets up some debug and environment settings, as well as some handles for in case the server itself encounters any errors. It then actually boots up the server, hooking it into `/app.js`, which contains the main application code. That script then delegates all HTTP calls from the root URL `/` to `routes/index.js`, as well as handling any errors that aren't caught by that route, like `404` errors.

 `routes/index.js` then defines some middleware and the route itself. This causes any HTTP request sent to the `/` url to first be parsed as JSON. If this fails, this triggers the error-catching middleware. If it success that, and a couple more checks to make sure there is a payload and it is valid, the route then calls `/lib/shows.js`, which has the logic for deciding which shows are valid, and what to respond to the request with.
