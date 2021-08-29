import React, { useState, useEffect } from 'react'
import {
	Container,
	Grow,
	Grid,
	AppBar,
	TextField,
	Button,
	Paper,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import InputBase from '@material-ui/core/InputBase'


import { getPosts, getPostsBySearch } from '../../actions/posts'

import useStyles from './styles'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}
const Search = () => {
	const classes = useStyles()
	const query = useQuery()
	const page = query.get('page') || 1
	const dispatch = useDispatch()

	const [search, setSearch] = useState('')
	const [tags, setTags] = useState([])
	const history = useHistory()

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
		<InputBase
			onKeyDown={handleKeyPress}
			name='search'
			//variant='outlined'
			placeholder='Search posts...'
			fullWidth
			value={search}
			onChange={e => setSearch(e.target.value)}
			//style={{ width: '100%' }}
			classes={{
				root: classes.inputRoot,
				input: classes.inputInput,
			  }}
			inputProps={{ 'aria-label': 'search' }}
		/>
	)

	return (
		<Paper className={classes.paper} color='inherit'>
			<TextField
				onKeyDown={handleKeyPress}
				name='search'
				variant='outlined'
				label='type something'
				fullWidth
				value={search}
				onChange={e => setSearch(e.target.value)}
				style={{ width: '100%', marginBottom: '10px' }}
			/>
			{/* <ChipInput
				style={{ margin: '10px 0', width: '100%' }}
				value={tags}
				onAdd={handleAddChip}
				onDelete={handleDeleteChip}
				label='Search Tags (press Enter)'
				variant='outlined'
                placeholder='Type in and press Enter'
			/> */}
			<Button
				onClick={searchPost}
				className={classes.searchButton}
				variant='contained'
				color='secondary'
				style={{ width: '100%' }}
			>
				Search
			</Button>
		</Paper>
	)
}

export default Search
