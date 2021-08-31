import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'

export const getPosts = async (req, res, next) => {
	const { page } = req.query
	try {
		const LIMIT = 8
		const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

		const total = await PostMessage.countDocuments({})
		const posts = await PostMessage.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex)

		res.json({
			data: posts,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		})
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const getPost = async (req, res) => {
	const { id } = req.params

	try {
		const post = await PostMessage.findById(id)

		res.status(200).json(post)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const getPostsBySearch = async (req, res, next) => {
	const { searchQuery, tags } = req.query

	try {
		const title = new RegExp(searchQuery, 'i')
		const posts = await PostMessage.find({
			$or: [
				{ title }, 
				// { tags: { $in: tags.split(',') } }
			],
		})
		res.json({ data: posts })
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: error.message })
	}
}

export const getPostsBySearchTag = async (req, res, next) => {
	const { tags } = req.query
	try {
		const posts = await PostMessage.find({
			$or: [ 
				{ tags }
			],
		})
		res.json({ data: posts })
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: error.message })
	}
}

export const createPost = async (req, res, next) => {
	const post = req.body

	const newPost = new PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	})

	try {
		await newPost.save()
		res.status(201).json(newPost)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const updatePost = async (req, res) => {
	const { id } = req.params
	const { title, message, creator, selectedFile, tags } = req.body

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`)

	const post = await PostMessage.findById(id)

	if (post.creator !== req.userId) {
		return res.status(401).send('Unauthorized. Cannot delete!')
	}

	post.creator = creator
	post.title = title
	post.message = message
	post.tags = tags
	post.selectedFile = selectedFile
	post._id = id

	await post.save()

	res.json(post)
}

export const deletePost = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post with id: ${id}`)
	}
	const post = await PostMessage.findById(id)
	if (post.creator !== req.userId) {
		return res.status(401).send('Unauthorized. Cannot delete!')
	}
	await post.remove()
	res.json({ message: 'deleted post successfully' })
}

export const likePost = async (req, res) => {
	const { id } = req.params

	if (!req.userId) {
		return res.status(401).send('Unauthorized')
	}

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`)

	const post = await PostMessage.findById(id)

	//check wherther post is already liked by user

	const index = post.likes.findIndex(id => id === String(req.userId))

	if (index === -1) {
		post.likes.push(req.userId)
	} else {
		post.likes = post.likes.filter(id => id !== String(req.userId))
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
		new: true,
	})

	res.json(updatedPost)
}



export const commentPost = async (req, res) => {
	console.log('comment')
	const { id } = req.params
	const { comment } = req.body

	if (!req.userId) {
		return res.status(401).send('Unauthorized')
	}

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

	const post = await PostMessage.findById(id)

	post.comments.push(comment)

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

	res.json(updatedPost)


}