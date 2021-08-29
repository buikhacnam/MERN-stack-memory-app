import express from 'express'
import {getPosts, getPostsBySearch, createPost, updatePost , deletePost, likePost, getPost, commentPost, getPostsBySearchTag} from '../controllers/post.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/search', getPostsBySearch)
router.get('/searchtag', getPostsBySearchTag)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/like', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)

export default router