import React, { useState, useEffect } from 'react'
import {
	Container,
	Grow,
	Grid,
	Paper,
	Typography,
	Divider,
	LinearProgress,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import FormUpdate from '../Form/FormUpdate'

import Pagination from '../Pagination'
import useStyles from './styles'
import Tags from '../Tags/Tags'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import {CREATE_POST_CLEAR_ERRORS} from '../../constants/actionTypes'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}
function useQuery() {
	return new URLSearchParams(useLocation().search)
}
const Home = () => {
	const { isLoading, postCreatedError } = useSelector(state => state.posts)
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


	const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
	  console.log('post createde')
	if (postCreatedError) {
		console.log('post createde error')

	  handleClickAlert();
	  dispatch({type: CREATE_POST_CLEAR_ERRORS})
	}
  }, [postCreatedError])
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

	useEffect(() => {
		dispatch(getPosts(page))
	}, [dispatch])

	return (
		<Grow in>
			<Container maxWidth='md'>
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
					<Grid item xs={12} sm={9} md={9}>
						<Form
							//currentId={currentId}
							setCurrentId={setCurrentId}
							open={open}
						/>
						{!isLoading ? (
							<Posts
								setCurrentId={setCurrentId}
								handleClose={handleClose}
								handleClickOpen={handleClickOpen}
							/>
						) : (
							<LinearProgress color='secondary' />
						)}
						{!searchQuery && !tags.length && (
							<Paper className={classes.pagination}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
					<Grid
						item
						xs={9}
						sm={3}
						md={3}
						className={classes.tags}
						style={{ width: '100%' }}
					>
						<div style={{ background: 'white', padding: '20px' }}>
							<Typography variant='h6' align='center'>
								Trending Now
							</Typography>
						</div>
						<Divider variant='middle' />
						<Tags />
					</Grid>
				</Grid>

				<Snackbar
					open={openAlert}
					autoHideDuration={3000}
					onClose={handleCloseAlert}
				>
					<Alert onClose={handleCloseAlert} severity='error'>
						Error, please try again!
					</Alert>
				</Snackbar>
			</Container>
		</Grow>
	)
}

export default Home
