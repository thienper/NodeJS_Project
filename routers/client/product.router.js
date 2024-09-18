const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/product.controller")

router.get('/:slug', controller.detail);

router.get('/', controller.index);

module.exports = router;