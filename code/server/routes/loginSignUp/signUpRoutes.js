const express=require('express');
const {createUser,getAllUsers,getUserByEmail,getUserById,deleteUser,updateUser} = require('../../controller/loginSignUp/signUpController');
const { createUserLocation } = require('../../controller/loginSignUp/signUpLocation');
const {updateUserPhoneNumber} = require('../../controller/loginSignUp/signUpPhoneNumber');
const router=express.Router();

router.get('/email/:email',getUserByEmail);
router.get('/id/:id',getUserById);
router.get('/',getAllUsers);

router.post('/',createUser);
router.delete('/:id',deleteUser);
router.patch('/:id',updateUser);
router.patch('/phone/:id',updateUserPhoneNumber);
router.post('/location',createUserLocation);

module.exports = router;