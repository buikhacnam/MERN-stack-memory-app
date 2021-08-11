import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper, CircularProgress } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

export default function Form({ currentId, setCurrentId }) {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	})

	const user = JSON.parse(localStorage.getItem('profile'))
	const classes = useStyles()

	const dispatch = useDispatch()

	const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null))
	const {isLoading1} = useSelector(state => state.posts)

	useEffect(() => {
		if (post) setPostData(post)
	}, [post])

	const handleSubmit = e => {
		e.preventDefault()

		if (currentId) {
			dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
		} else {
			dispatch(createPost({...postData, name: user?.result?.name}))
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

	if(!user?.result?.name) {
		return <Paper className={classes.paper}>
			<Typography variant="h6" align='center'>
				Please login to post
			</Typography>
		</Paper>
	}

	return (
		<Paper className={classes.paper} elevation={6}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					Creating a Memory
				</Typography>
				{isLoading1 && <CircularProgress size={20}/>}
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={e =>
						setPostData({ ...postData, title: e.target.value })
					}
				/>
				<TextField
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
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags (coma separated)'
					fullWidth
					value={postData.tags}
					onChange={e =>
						setPostData({
							...postData,
							tags: e.target.value.split(','),
						})
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	)
}
