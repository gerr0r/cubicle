require('dotenv').config()
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

const mongoose = require("mongoose");

mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.error(err);
        throw err;
    }

    console.log("Database up and running!");
})

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Server up on port ${config.port}!`));