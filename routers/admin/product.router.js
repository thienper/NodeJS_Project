const express = require('express');
const router = express.Router();
const multer = require('multer')
const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validates/admin/productsvalidate")
const storageMulter = require("../../helpers/storageMulter");
//const { validate } = require('../../models/product.model');
const upload = multer({ storage: storageMulter() })


router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create)

router.post(
    "/create",
    upload.single("thumbnail"),
    validate.createPost,
    controller.createPost
)

module.exports = router; 