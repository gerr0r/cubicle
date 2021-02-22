const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require("cookie-parser");

module.exports = app => {
    // Setup cookies
    app.use(cookieParser());
    
    // Setup the view engine
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');
    
    // Setup the body parser
    app.use(express.urlencoded({ extended: false }));

    // Setup the static files
    app.use(express.static('static'))
}
