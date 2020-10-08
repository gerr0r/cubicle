const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

const mongoose = require("mongoose");

mongoose.connect(config._dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.log(config._dbUrl);
        console.error(err);
        throw err;
    }

    console.log("Database is up and running!");
})

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));