import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import Icon from './icon'
import { signin, signup } from '../../actions/auth'
import { AUTH, AUTH_CLEAR_ERRORS } from '../../constants/actionTypes'
import useStyles from './styles'
import Input from './Input'

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

export default function Auth() {
	const classes = useStyles()
	const [isSignup, setIsSignup] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const history = useHistory()
	const dispatch = useDispatch()
	const { errors } = useSelector(state => state.auth)
	const handleSubmit = e => {
		e.preventDefault()
		if (isSignup) {
			dispatch(signup(formData, history))
		} else {
			dispatch(signin(formData, history))
		}
	}

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleShowPassword = () => setShowPassword(!showPassword)

	const switchMode = () => {
		// setForm(initialState);
		dispatch({type: AUTH_CLEAR_ERRORS})
		setIsSignup(prevIsSignup => !prevIsSignup)
		setShowPassword(false)
	}

	const googleSuccess = async res => {
		console.log('google login success')
		const result = await res?.profileObj
		const token = await res?.tokenId

		try {
			dispatch({ type: AUTH, data: { token, result } })
			history.push('/')
		} catch (error) {}
	}

	const googleError = error => {
		console.log('error: ', error)
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper}>
				<Typography component='h1' variant='h5'>
					{isSignup ? 'Sign up' : 'Sign in'}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='secondary'
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>

					<GoogleLogin
						clientId='764653909373-eauqbjg9h31q0r5qi1lv7saor71kspo0.apps.googleusercontent.com'
						render={renderProps => (
							<Button
								className={classes.googleButton}
								color='secondary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant='contained'
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleError}
						cookiePolicy='single_host_origin'
					/>
					{errors && (
						<Alert style={{marginBottom: '10px'}} severity='error'>
							Something went wrong, please try again!
						</Alert>
					)}

					<Grid container justify='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? 'Already have an account? Sign in'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}
