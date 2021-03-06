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
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.dbUrl, err => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log("Database up and running!");
})

require('./config/express')(app);

app.use("/", mainRoutes)
app.use("/", staticRoutes)
app.use("/", authRoutes)
app.use("/", errorRoutes)

app.listen(config.port, console.log(`Server up on port ${config.port}!`));