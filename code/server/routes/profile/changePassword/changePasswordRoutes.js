const express = require('express');
const {patchPasswordByID, findUser} = require('../../../controller/profile/changePassword/changePasswordController');
const router = express.Router();
router.use(express.json());
router.post('/:id', findUser);
router.patch('/:id', patchPasswordByID);
module.exports = router;