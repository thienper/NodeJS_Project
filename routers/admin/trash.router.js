const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product.controller")

router.get('/', controller.trash);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItemForever);

router.get('/return/:id', controller.returnItem);

module.exports = router;