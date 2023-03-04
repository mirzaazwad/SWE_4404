const express=require('express');
const {createUser,getAllUsers,getUserByEmail,getUserById,deleteUser,updateUser} = require('../../controller/loginSignUp/signUpController')
const router=express.Router();

router.get('/email/:email',getUserByEmail);
router.get('/id/:id',getUserById);
router.get('/',getAllUsers);

router.post('/',createUser);
router.delete('/:id',deleteUser);
router.patch('/:id',updateUser);

module.exports = router;