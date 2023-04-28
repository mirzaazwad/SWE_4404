const express=require('express');
const {getMessages,addMessage,getAllSenders,countUnread,countUnreadReceiver, countAllUnreadReceiver,toggleRead, countAllUnread,toggleReadReceiver} = require('../controller/chat-controller');
const requireAuth = require('../middleware/requireAuth');
const router=express.Router();

router.use(requireAuth);

router.post('/messages',getMessages);
router.post('/send',addMessage);
router.get('/senders/:id',getAllSenders);
router.post('/countMessages',countUnread);
router.post('/countMessagesReceiver',countUnreadReceiver);
router.post('/countAllMessages',countAllUnread);
router.post('/countAllMessagesReceiver',countAllUnreadReceiver);
router.post('/toggleRead',toggleRead);
router.post('/toggleReadReceiver',toggleReadReceiver);

module.exports = router;