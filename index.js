require('dotenv').config()
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const app = express();

const mainRoutes = require("./routes/main")
const staticRoutes = require("./routes/static")
const authRoutes = require("./routes/auth")
const errorRoutes = require("./routes/error")

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
// require('./routes/routes')(app);

app.use("/",mainRoutes)
app.use("/",staticRoutes)
app.use("/",authRoutes)
app.use("/",errorRoutes)

app.listen(config.port, console.log(`Server up on port ${config.port}!`));