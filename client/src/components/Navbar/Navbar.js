import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'
import * as actionType from '../../constants/actionTypes'
import useStyles from './styles'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import Search from '../Search/Search'
import InputBase from '@material-ui/core/InputBase'

import Dialog from '@material-ui/core/Dialog'

const Navbar = () => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('profile'))
	)
	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()
	const classes = useStyles()
	const logout = () => {
		dispatch({ type: actionType.LOGOUT })
		history.push('/auth')
		setUser(null)
	}

	useEffect(() => {
		const token = user?.token
		if (token) {
			const decoded = decode(token)
			if (decoded.exp * 1000 < new Date().getTime()) {
				logout()
			}
		}
		setUser(JSON.parse(localStorage.getItem('profile')))
	}, [location])

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to='/'
					className={classes.heading}
					variant='h6'
					align='center'
				>
					Moments Share
				</Typography>

				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<Search />
				</div>
			</div>
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.result.name}
							src={user?.result.imageUrl}
						>
							{user?.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{user?.result.name}
						</Typography>
						<Button
							variant='outlined'
							className={classes.logout}
							color='secondary'
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='secondary'
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
