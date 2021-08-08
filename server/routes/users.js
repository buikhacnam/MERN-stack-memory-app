import express from 'express'
import {signin, signup} from '../controllers/user.js'

const router = express.Router()

router.get('/signin', (req, res) => {
    res.send('Hello from users')
})
router.post('/signin', signin)
router.post('/signup', signup)


export default router