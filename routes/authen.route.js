const express = require('express');

const router = express.Router();

const controller = require('../controller/authen.controller');
const validate = require('../validate/authen.validate');

router.get('/login', controller.login);
router.post('/login', validate.postLogin, controller.postLogin)

module.exports = router;