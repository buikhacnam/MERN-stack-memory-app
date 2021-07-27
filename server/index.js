import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use('/posts', postRoutes)

const CONNECTION_URL = `mongodb+srv://buinam:mrbui123456@cluster0.jntsz.mongodb.net/memories?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch(error => console.log(error.message))
mongoose.set('useFindAndModify', false)

