import * as api from '../api'
import { AUTH, AUTH_ERROR } from '../constants/actionTypes'

export const signin = (formData, history) => {
	return async function (dispatch) {
		try {
			const { data } = await api.signIn(formData)
			dispatch({ type: AUTH, data: data })
			history.push('/')
		} catch (error) {
			dispatch({ type: AUTH_ERROR, data: error })
			console.log(error)
		}
	}
}

export const signup = (formData, history) => {
	return async function (dispatch) {
		try {
			const { data } = await api.signUp(formData)
			dispatch({ type: AUTH, data: data })
			history.push('/')
		} catch (error) {
			dispatch({ type: AUTH_ERROR, data: error })
			console.log(error)
		}
	}
}
