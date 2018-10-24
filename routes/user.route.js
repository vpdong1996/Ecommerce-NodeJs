const express = require('express'); 
var multer  = require('multer');

const validate = require('../validate/user.validate');
const controller = require('../controller/user.controller');
var upload = multer({ dest: './public/uploads/' });


const router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.viewId);
router.get('/delete/:id', controller.deleteId);
router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

module.exports = router;