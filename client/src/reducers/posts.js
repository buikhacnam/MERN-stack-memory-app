import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE, START_LOADING, FETCH_BY_SEARCH, END_LOADING } from '../constants/actionTypes'

const reducer = (state = {isLoading: true, posts: []}, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			  };
		case CREATE:
			return [action.payload, ...state]
		case UPDATE:
		case LIKE:
			return state.map(post => {
				if (post._id === action.payload._id) {
					post = action.payload
				}
				return post
			})
		case DELETE:
			return state.filter(post => post._id !== action.payload)
		case FETCH_BY_SEARCH:
			return { ...state, posts: action.payload.data }
		case START_LOADING:		
				return { ...state, isLoading: true };
		case END_LOADING:
				return { ...state, isLoading: false };
		default:
			return state
	}
}

export default reducer
