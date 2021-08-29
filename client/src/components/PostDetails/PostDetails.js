import React, { useEffect } from 'react'
import {
	Paper,
	Typography,
	CircularProgress,
	Divider,
	Button
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'

import { getPost, getPostsBySearch, deletePost } from '../../actions/posts'
import useStyles from './styles'
import CommentSection from './CommentSection'
import DeleteIcon from '@material-ui/icons/Delete'


const Post = () => {
	const user = JSON.parse(localStorage.getItem('profile'))

	const { post, posts, isLoading } = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const history = useHistory()
	const classes = useStyles()
	const { id } = useParams()

	useEffect(() => {
		dispatch(getPost(id))
	}, [id])

	useEffect(() => {
		if (post) {
			// for recommend posts
			dispatch(
				getPostsBySearch({
					search: 'none',
					tags: post?.tags?.join(',') || '',
				})
			)
		}
	}, [post])

	if (!post) return null

	const openPost = _id => history.push(`/posts/${_id}`)

	if (isLoading) {
		return (
			<Paper className={classes.loadingPaper}>
				<CircularProgress size='7em' />
			</Paper>
		)
	}

	const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

	return (
		<Paper style={{ padding: '20px', borderRadius: '15px' }}>
			<div className={classes.card}>
			
				<div className={classes.imageSection}>
					<img
						className={classes.media}
						src={
							post.selectedFile ||
							'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
						}
						alt={post.title}
					/>
				</div>

				<div className={classes.section}>
					{/* <Typography variant='h3' component='h2'>
						{post.title}
					</Typography> */}
					<Typography
						gutterBottom
						variant='h6'
						color='textSecondary'
						component='h2'
					>
						{post.tags.map(tag => `#${tag} `)}
					</Typography>
					<Typography gutterBottom variant='body1' component='p'>
						{post.title}
					</Typography>
					<Typography variant='h6'>
						Created by: {post.name}
					</Typography>
					<Typography variant='body1'>
						{moment(post.createdAt).fromNow()}
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					{(user?.result?.googleId === post?.creator ||
						user?.result?._id === post?.creator) && (
						<Button
							size='small'
							onClick={() => {
								dispatch(deletePost(post._id))
								history.push(`/posts/`)
							}}
						>
							<DeleteIcon fontSize='small' /> &nbsp; Delete
						</Button>
					)}
					<CommentSection post={post} />
					<Divider style={{ margin: '20px 0' }} />
				</div>

				
			</div>
			
			
			{!!recommendedPosts.length && (
				<div className={classes.section}>
					<Typography gutterBottom variant='h5'>
						You might also like:
					</Typography>
					<Divider />
					<div className={classes.recommendedPosts}>
						{recommendedPosts.map(
							({
								title,
								name,
								message,
								likes,
								selectedFile,
								_id,
							}) => (
								<div
									style={{
										margin: '20px',
										cursor: 'pointer',
									}}
									onClick={() => openPost(_id)}
									key={_id}
								>
									<Typography gutterBottom variant='h6'>
										{title}
									</Typography>
									<Typography
										gutterBottom
										variant='subtitle2'
									>
										{name}
									</Typography>
									<Typography
										gutterBottom
										variant='subtitle2'
									>
										{message}
									</Typography>
									<Typography
										gutterBottom
										variant='subtitle1'
									>
										Likes: {likes.length}
									</Typography>
									<img src={selectedFile} width='200px' />
								</div>
							)
						)}
					</div>
				</div>
			)}
		</Paper>
	)
}

export default Post
