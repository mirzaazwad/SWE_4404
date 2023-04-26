const express=require('express');
const {getMessages,addMessage} = require('../controller/chat-controller');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);

router.post('/messages',getMessages);
router.post('/send',addMessage);

module.exports = router;