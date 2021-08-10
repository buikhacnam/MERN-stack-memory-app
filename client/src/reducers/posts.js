import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE, START_LOADING, FETCH_BY_SEARCH, END_LOADING } from '../constants/actionTypes'

const reducer = (posts = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload
		case CREATE:
			return [action.payload, ...posts]
		case UPDATE:
		case LIKE:
			return posts.map(post => {
				if (post._id === action.payload._id) {
					post = action.payload
				}
				return post
			})
		case DELETE:
			return posts.filter(post => post._id !== action.payload)
		case FETCH_BY_SEARCH:
			return action.payload
		default:
			return posts
	}
}

export default reducer
