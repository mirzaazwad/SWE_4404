const express=require('express');
const {getMessages,addMessage,getAllSenders,countUnread, toggleRead, countAllUnread} = require('../controller/chat-controller');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);

router.post('/messages',getMessages);
router.post('/send',addMessage);
router.get('/senders/:id',getAllSenders);
router.post('/countMessages',countUnread);
router.post('/countAllMessages',countAllUnread);
router.post('/toggleRead',toggleRead);

module.exports = router;