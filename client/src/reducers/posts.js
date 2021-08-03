const reducer = (posts = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload
		case 'CREATE':
			return [...posts, action.payload]
		case 'UPDATE':
		case 'LIKE':
			return posts.map(post => {
				if (post._id === action.payload._id) {
					post = action.payload
				}
				return post
			})
		case 'DELETE':
			return posts.filter(post => post._id !== action.payload)
		default:
			return posts
	}
}

export default reducer
