import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import useStyles from './styles'
import { Grid, CircularProgress } from '@material-ui/core'

export default function Posts({currentId, setCurrentId, handleClose, handleClickOpen}) {
	const {posts} = useSelector(state => state.posts)
	const classes = useStyles()
	return (
		<div>
			{!posts?.length ? (
				<CircularProgress />
			) : (
				<Grid
					className={classes.container}
					container
					alignItems='stretch'
					spacing={3}
				>
					{posts.map(post => {
						return (
							<Grid key={post._id} item xs={12} sm={12}>
								<Post post={post} setCurrentId={setCurrentId} handleClose={handleClose} handleClickOpen={handleClickOpen}/>
							</Grid>
						)
					})}
				</Grid>
			)}
		</div>
	)
}
