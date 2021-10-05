import {
	FETCH_ALL,
	FETCH_POST,
	CREATE,
	UPDATE,
	LIKE,
	DELETE,
	START_LOADING,
	FETCH_BY_SEARCH,
	END_LOADING,
	COMMENT,
	FETCH_BY_SEARCH_TAG,
	CREATE_POST_ERROR,
	CREATE_POST_CLEAR_ERRORS
} from '../constants/actionTypes'

const reducer = (
	state = {
		isLoading: true,
		isLoading1: false,
		posts: [],
		postCreatedError: false,
	},
	action
) => {
	switch (action.type) {
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			}
		case CREATE:
			return {
				...state,
				postCreatedError: false,
				posts: [action.payload, ...state.posts],
			}
		case UPDATE:
		case LIKE:
			return {
				...state,
				postCreatedError: false,
				posts: state.posts.map(post => {
					if (post._id === action.payload._id) {
						post = action.payload
					}
					return post
				}),
			}
		case DELETE:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload),
			}
		case FETCH_BY_SEARCH:
			return { ...state, posts: action.payload.data }
		case FETCH_BY_SEARCH_TAG:
			return { ...state, posts: action.payload.data }
		case FETCH_POST:
			return { ...state, post: action.payload.post }
		case START_LOADING:
			return { ...state, isLoading: true }
		case END_LOADING:
			return { ...state, isLoading: false }
		case COMMENT:
			return {
				...state,
				posts: state.posts.map(post => {
					if (post._id === action.payload._id) {
						return action.payload
					}
					return post
				}),
			}
		case START_LOADING_1:
			return { ...state, isLoading1: true }
		case END_LOADING_1:
			return { ...state, isLoading1: false }
		case CREATE_POST_ERROR:
			return { ...state, postCreatedError: true }
		case CREATE_POST_CLEAR_ERRORS: 
			return { ...state, postCreatedError: false }
		default:
			return state
	}
}

export default reducer
