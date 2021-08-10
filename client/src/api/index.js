import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use(req => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = async () => await API.get('/posts')
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = async newPost => await API.post('/posts', newPost)
export const updatePost = async (id, updatedPost) => await API.patch(`/posts/${id}`, updatedPost)
export const deletePost = async id => await API.delete(`/posts/${id}`)
export const likePost = async id => await API.patch(`/posts/${id}/like`)

export const signIn = async formData => await API.post('users/signin', formData)
export const signUp = async formData => await API.post('/users/signup', formData)
 