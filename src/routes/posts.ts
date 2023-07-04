import express, { Response, Request } from 'express';

import {
  createPost,
  fetchAllPosts,
  fetchPostsByUser,
<<<<<<< HEAD
//   likePost,
=======
  likePost,
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b
  togglePostVisibility,
  updatePost,
  deletePost,
} from '../controller/post';

import { auth } from '../middleware/auth';
import blockAccountFromPost from '../controller/blockAccount';

const router = express.Router();

router.post('/create-post', auth, createPost);

<<<<<<< HEAD
// router.put('/like-post/:id', auth, likePost);
=======
router.put('/like-post/:id', auth, likePost);
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b

router.get('/all', fetchAllPosts);
router.get('/userId', auth, fetchPostsByUser);

router.patch('/block/:id', auth, blockAccountFromPost);
router.put('/toggle-visibility/:postId', auth, togglePostVisibility);
router.put('/updatePost/:id', updatePost);
router.delete('/deletePost/:id', deletePost);

export default router;
