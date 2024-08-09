const path = require('path');
const pug = require('pug');
const express = require('express');
const router = require("./routers/client/index.router");

require("dotenv").config();
const database = require("./config/database")


database.connect();
const app = express();
const port = process.env.PORT;

// Template engine
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))

//Router
router(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
