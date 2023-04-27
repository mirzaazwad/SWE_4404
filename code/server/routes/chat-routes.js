const express=require('express');
const {getMessages,addMessage,getAllMessages,getAllSenders} = require('../controller/chat-controller');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);

router.post('/messages',getMessages);
router.post('/send',addMessage);
router.get('/senders/:id',getAllSenders);

module.exports = router;