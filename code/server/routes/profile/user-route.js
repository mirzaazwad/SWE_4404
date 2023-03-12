const express=require('express');
const {getUserByID, patchUserByID,changePassword, verifyPassword} = require('../../controller/profile-controller');
const requireAuth = require('../../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);
router.post('/verify',verifyPassword);
router.get('/:id',getUserByID);
router.patch('/:id',patchUserByID);
router.post('/',changePassword);

module.exports = router;