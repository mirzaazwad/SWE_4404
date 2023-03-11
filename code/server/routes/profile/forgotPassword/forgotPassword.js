const express = require('express');
const {userExists} = require('../../../controller/profile/forgotPassword/forgotPasswordController');
const router = express.Router();
router.use(express.json());
router.post('/', userExists);
module.exports = router;