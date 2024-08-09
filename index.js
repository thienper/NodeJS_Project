const path = require('path');
const pug = require('pug');
const express = require('express');
const router = require("./routers/client/index.router")
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Template engine
app.set('views', './views');
app.set('view engine', 'pug');

//Router
router(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
