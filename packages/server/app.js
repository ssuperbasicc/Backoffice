var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const routes = require("./registerRoutes")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

for (let index = 0; index < routes.length; index++) {
    const route = routes[index]
    app.use(process.env.SERVER_ROUTE_PREFIX + route.uri, require(route.path))
}

module.exports = app;
