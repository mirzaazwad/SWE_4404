const express=require('express');
const {getUserByID, patchUserByID} = require('../../controller/profile-controller');
const requireAuth = require('../../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.get('/:id',getUserByID);
router.patch('/:id',patchUserByID);

module.exports = router;