const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/product.controller")

router.get('/product', controller.index);
module.exports = router;