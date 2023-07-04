import express from "express";
<<<<<<< HEAD
import { createComment, fetchComments } from "../controller/commentsController";
=======
import { createComment, fetchComments, likeComment } from '../controller/commentsController';
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b
import { auth } from "../middleware/auth";

// const {authenticatedUser} = require("../middleware/index");
// import authenticatedUser from "../middleware/index";
const router = express.Router();

router.post('/create-comment', auth, createComment);
router.get('/', auth, fetchComments);
<<<<<<< HEAD
=======
router.put('/:id', likeComment);
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b
// router.delete('/:commentId', auth, deleteComment);

export default router;