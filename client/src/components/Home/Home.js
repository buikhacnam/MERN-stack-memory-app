import React, { useState, useEffect } from 'react'
import {
	Container,
	Grow,
	Grid,
	AppBar,
	TextField,
	Button,
	Paper,
	Typography,
	Divider,
	LinearProgress
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import { getPosts, getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import FormUpdate from '../Form/FormUpdate'

import Pagination from '../Pagination'
import useStyles from './styles'
import Tags from '../Tags/Tags'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}
const Home = () => {
	const {isLoading} = useSelector(state => state.posts)
	const classes = useStyles()
	const query = useQuery()
	const page = query.get('page') || 1
	const searchQuery = query.get('searchQuery')

	const [currentId, setCurrentId] = useState(0)
	const dispatch = useDispatch()

	const [search, setSearch] = useState('')
	const [tags, setTags] = useState([])
	const history = useHistory()

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
			history.push(
				`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(
					','
				)}`
			)
		} else {
			history.push('/')
		}
	}

	const handleKeyPress = e => {
		if (e.keyCode === 13) {
			searchPost()
		}
	}

	const handleAddChip = tag => setTags([...tags, tag])

	const handleDeleteChip = chipToDelete =>
		setTags(tags.filter(tag => tag !== chipToDelete))

	useEffect(() => {
		dispatch(getPosts(page))
	}, [dispatch])

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='form-dialog-title'
				>
					<DialogContent>
						<FormUpdate
							currentId={currentId}
							setCurrentId={setCurrentId}
							handleClose={handleClose}
						/>
					</DialogContent>
				</Dialog>
				<Grid
					container
					justify='space-between'
					alignItems='stretch'
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Form
							//currentId={currentId}
							setCurrentId={setCurrentId}
							open={open}
						/>
						{!isLoading ? 
						<Posts
							setCurrentId={setCurrentId}
							handleClose={handleClose}
							handleClickOpen={handleClickOpen}
						/> : <LinearProgress color='secondary'/>}
						{!searchQuery && !tags.length && (
							<Paper className={classes.pagination}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
					<Grid item xs={12} sm={6} md={3} className={classes.tags}>
						<div style={{ background: 'white', padding: '20px' }}>
							<Typography variant='h6' align='center'>
								Trending Now
							</Typography>
						</div>
						<Divider variant='middle' />
						<Tags />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
}

export default Home
