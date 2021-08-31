import { AUTH, AUTH_ERROR, LOGOUT, AUTH_CLEAR_ERRORS } from '../constants/actionTypes'

const authReducer = (state = { authData: null, errors: false }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
			return {
				...state,
				authData: action.data,
				loading: false,
				errors: false,
			}
		case LOGOUT:
			localStorage.removeItem('profile')
			return { ...state, authData: null, loading: false, errors: false }
		case AUTH_ERROR:
			return { ...state, errors: true, loading: false, authData: null }
		case AUTH_CLEAR_ERRORS: {
			return {...state, errors: false}
		}
		default:
			return state
	}
}

export default authReducer
