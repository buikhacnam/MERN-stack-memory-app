import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useStyles from './styles'
import { Grid, CircularProgress, } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { getPosts, getPostsBySearchTag } from '../../actions/posts'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

export default function Tags({ currentId, setCurrentId }) {
	const { posts } = useSelector(state => state.posts)
	const classes = useStyles()
	const history = useHistory()
	const query = useQuery()
	const page = query.get('page') || 1
	const dispatch = useDispatch()

	const searchPost = tag => {
		console.log('tagggggggggg', { tags: [tag] })
		dispatch(getPostsBySearchTag({ tags: [tag] }))
		history.push(`/posts/searchtag?searchQuery=none&tags=${tag}`)
	}

	React.useEffect(() => {
		dispatch(getPosts(page))
	}, [dispatch])

	return (
		<div>
			{!posts?.length ? (
				<CircularProgress />
			) : (
				<div className={classes.tags}>
					{posts.map(post => {
						return (
							<span post={post}>
								{post.tags.map(tag => {
									return (
										<>
											{tag?.length ? (
												<p
                                                    style={{cursor: 'pointer'}}
													onClick={() => {
														searchPost(tag)
													}}
												>
													#{tag}
												</p>
											) : null}
										</>
									)
								})}
							</span>
						)
					})}
				</div>
			)}
		</div>
	)
}
