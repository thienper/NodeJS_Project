const express = require('express');
const router = express.Router();
const multer = require("multer")
const controller = require("../../controllers/admin/product-category.controller")
const upload = multer();
const validate = require("../../validates/admin/product-category.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.get('/create', controller.create);
router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
)
router.get('/edit/:id', controller.edit);
router.patch(
    '/edit/:id',
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch);

router.delete('/edit/:id', controller.deleteItem);
module.exports = router; 