
const express = require('express');
const router = express.Router();
const { createGroup, getGroupById, joinGroup, leaveGroup, getAllGroups } = require('../controller/group');
const { authenticatedUser } = require('../middleware/index');


<<<<<<< HEAD
router.get('/all', getAllGroups);
=======
router.get('/all', authenticatedUser ,getAllGroups);
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b
router.post('/create-group', authenticatedUser, createGroup);
router.get('/group/:id', getGroupById);
router.post('/group/:id/join', authenticatedUser, joinGroup);
router.post('/group/:id/leave', authenticatedUser, leaveGroup);

module.exports = router;


