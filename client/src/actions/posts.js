import * as api from '../api'
import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	LIKE,
	DELETE,
	START_LOADING,
	FETCH_BY_SEARCH,
	END_LOADING,
	START_LOADING_1,
	END_LOADING_1
} from '../constants/actionTypes'

//Action creators
export const getPosts = (page) => {
	return async dispatch => {
		try {
			dispatch({ type: START_LOADING })
			const { data } = await api.fetchPosts(page)
			dispatch({ type: FETCH_ALL, payload: data })
			dispatch({ type: END_LOADING })
		} catch (error) {
			console.log(error.message)
		}
	}
}

export const getPostsBySearch = searchQuery => {
	return async dispatch => {
		try {
			console.log('searchQuery', searchQuery)
			dispatch({ type: START_LOADING })
			const {
				data: { data },
			} = await api.fetchPostsBySearch(searchQuery)
			console.log('data', data)
			dispatch({ type: FETCH_BY_SEARCH, payload: { data } })
			dispatch({ type: END_LOADING })
		} catch (error) {
			console.log(error)
		}
	}
}

export const createPost = post => {
	return async dispatch => {
		try {
			dispatch({ type: START_LOADING_1 })
			const { data } = await api.createPost(post)
			dispatch({ type: CREATE, payload: data })
			dispatch({ type: END_LOADING_1 })
		} catch (error) {
			console.log(error)
		}
	}
}

export const updatePost = (id, post) => {
	return async function (dispatch) {
		try {
			dispatch({ type: START_LOADING_1 })
			const { data } = await api.updatePost(id, post)
			dispatch({ type: UPDATE, payload: data })
			dispatch({ type: END_LOADING_1 })
		} catch (error) {
			console.log(error)
		}
	}
}

export const deletePost = id => {
	return async function (dispatch) {
		try {
			dispatch({ type: START_LOADING_1 })
			await api.deletePost(id)
			dispatch({ type: DELETE, payload: id })
			dispatch({ type: END_LOADING_1 })
		} catch (error) {
			console.log(error)
		}
	}
}

export const likePost = id => {
	return async function (dispatch) {
		try {
			const { data } = await api.likePost(id)
			dispatch({ type: LIKE, payload: data })
		} catch (error) {
			console.log(error)
		}
	}
}
