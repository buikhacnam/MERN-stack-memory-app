import React from 'react'
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
	Avatar,
} from '@material-ui/core/'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import InfoIcon from '@material-ui/icons/Info'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import ChatIcon from '@material-ui/icons/Chat'

import { getPost, likePost, deletePost } from '../../../actions/posts'
import useStyles from './styles'

const Post = ({ post, setCurrentId, handleClose, handleClickOpen }) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const user = JSON.parse(localStorage.getItem('profile'))
	const history = useHistory()
  const {isLoading}  = useSelector(state => state.posts)

	const Likes = () => {
		if (post?.likes?.length > 0) {
			return post.likes.find(
				like => like === (user?.result?.googleId || user?.result?._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${
								post.likes.length > 1 ? 's' : ''
						  }`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{post.likes.length}{' '}
					{post.likes.length === 1 ? 'Like' : 'Likes'}
				</>
			)
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		)
	}

	const openPost = e => {
		// dispatch(getPost(post._id, history));

		history.push(`/posts/${post._id}`)
	}

	return (
		<Card className={classes.card}>
			<CardActions style={{ padding: '16px' }}>
				<div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<Avatar
							className={classes.purple}
							// alt={user?.result.name}
							 src={user?.result?.name === post.name? user?.result?.imageUrl : null}
						>
							{post.name[0].toUpperCase()}
						</Avatar>
						<Typography variant='h6' style={{ marginLeft: '10px' }}>
							{post.name}
						</Typography>
					</div>

					<Typography variant='body2'>
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<div className={classes.overlay2} name='edit'>
						<Button
							onClick={e => {
								e.stopPropagation()
								setCurrentId(post._id)
								handleClickOpen()
							}}
							size='small'
						>
							<MoreHorizIcon fontSize='default' />
						</Button>
					</div>
				)}
			</CardActions>
			<ButtonBase
				component='span'
				name='test'
				className={classes.cardAction}
				onClick={openPost}
			>
				<CardMedia
					className={classes.media}
					image={
						post.selectedFile ||
						'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
					}
					title={post.title}
				/>
			</ButtonBase>
			
				<CardActions className={classes.cardActions}>
					<div>
						<Button
							size='small'
							disabled={!user?.result}
							onClick={() => dispatch(likePost(post._id))}
						>
							<Likes />
						</Button>
						<Button
							size='small'
							onClick={openPost}
						>
							<ChatIcon style={{marginRight: '10px'}}/> {post.comments.length}{' '}
							{post.comments.length <= 1 ? 'Comment' : 'Comments'}
						</Button>
					</div>

					{/* {(user?.result?.googleId === post?.creator ||
						user?.result?._id === post?.creator) && (
						<Button
							size='small'
							onClick={() => dispatch(deletePost(post._id))}
						>
							<DeleteIcon fontSize='small' /> &nbsp; Delete
						</Button>
					)} */}
				</CardActions>
				<div className={classes.details}>
					<Typography
						variant='body2'
						color='textSecondary'
						component='h2'
					>
						{post.tags.map(tag => `#${tag} `)}
					</Typography>
				</div>
				<Typography
					className={classes.title}
					gutterBottom
					variant='h5'
					component='h2'
				>
					{post.title}
				</Typography>

				<CardContent style={{ paddingTop: '0px' }}>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'
					>
						{post.message.split(' ').splice(0, 20).join(' ')}
					</Typography>
				</CardContent>
		</Card>
	)
}

export default Post
