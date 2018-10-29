const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
})

const imgFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

var upload = multer({
    storage,
    fileFilter: imgFilter
});


const validate = require('../validate/user.validate');
const controller = require('../controller/user.controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.viewId);
router.get('/delete/:id', controller.deleteId);
router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);
router.get('/:id/update', upload.single('avatar'), controller.editUser);
router.post('/:id/update', upload.single('avatar'), controller.postEditUser);

module.exports = router;