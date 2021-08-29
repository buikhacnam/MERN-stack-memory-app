import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import {
	TextField,
	Button,
	Typography,
	Paper,
	CircularProgress,
} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useHistory } from 'react-router'

export default function FormUpdate({ currentId, setCurrentId, handleClose }) {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	})

	const history = useHistory()
	const user = JSON.parse(localStorage.getItem('profile'))
	const classes = useStyles()

	const dispatch = useDispatch()

	const post = useSelector(state =>
		currentId
			? state.posts.posts.find(message => message._id === currentId)
			: null
	)
	const { isLoading1 } = useSelector(state => state.posts)

	useEffect(() => {
		if (post) setPostData(post)
	}, [post])

	const handleSubmit = e => {
		e.preventDefault()

		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			)
            handleClose()

		} else {
			dispatch(
				createPost({ ...postData, name: user?.result?.name }, history)
			)
		}
		clear()
	}

	const clear = () => {
		setCurrentId(null)
		setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		})
	}

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please login to post
				</Typography>
			</Paper>
		)
	}

	return (
		<Paper className={classes.paper}>
           
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				{/* <Typography variant='h6'>What's on your mind?</Typography> */}
				<TextField
					name='title'
					variant='outlined'
					label={`Update the post`}
					fullWidth
					multiline
					rows={3}
					value={postData.title}
					onChange={e =>
						setPostData({ ...postData, title: e.target.value })
					}
				/>
				{/* <TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					multiline
					rows={4}
					value={postData.message}
					onChange={e =>
						setPostData({ ...postData, message: e.target.value })
					}
				/> */}

				<div className={classes.fileInput}>
					<div>
						<div style={{ marginLeft: '8px' }}>
							<FileBase
								type='file'
								multiple={false}
								onDone={({ base64 }) =>
									setPostData({
										...postData,
										selectedFile: base64,
									})
								}
							/>
						</div>
						<TextField
							name='tags'
							label='Tags (seperate by coma)'
							value={postData.tags}
							onChange={e =>
								setPostData({
									...postData,
									tags: e.target.value.split(','),
								})
							}
							placeholder='monday,motivation'
						/>
					</div>

					<Button
						className={classes.buttonSubmit}
						style={{ marginRight: '8px' }}
						variant='contained'
						color='secondary'
						size='large'
						type='submit'
						//fullWidth
					>
						Update
					</Button>
				</div>
				{/* <Button
					className={classes.buttonSubmit}
					variant='contained'
					color='secondary'
					size='large'
					type='submit'
					//fullWidth
				>
					Post
				</Button> */}
				{/* <Button
					variant='outlined'
					color='secondary'
					size='small'
					onClick={clear}
					fullWidth
				>
					Clear
				</Button> */}
			</form>
		</Paper>
	)
}
