const path = require('path');
const pug = require('pug');
const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const routerAdmin = require("./routers/admin/index.router");
const router = require("./routers/client/index.router");
const systemConfig = require("./config/system");

require("dotenv").config();
const database = require("./config/database");


database.connect();
const app = express();
const port = process.env.PORT;

// flash
app.use(cookieParser('THIENPER'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

//method override
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Template engine
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

//App local
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Router
routerAdmin(app);
router(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
