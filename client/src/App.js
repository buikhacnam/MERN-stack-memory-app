import { useEffect } from 'react'
import {Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import memories from './images/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import { useDispatch } from 'react-redux'
import {getPosts} from './actions/posts'
import useStyles from './styles'
function App() {
	const classes = useStyles()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])
	return <Container>
		<AppBar position='static' color='inherit' className={classes.appBar}>
			<Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
			<img className={classes.image} src={memories} alt='memories' height='60'/>
		</AppBar>
		<Grow in>
			<Grid container justify='space-between' alignItems='stretch' spacing={4}>
				<Grid item sx={12} sm={7}>
					<Posts />
				</Grid>
				<Grid item sx={12} sm={4}>
					<Form />
				</Grid>
			</Grid>
		</Grow>
	</Container>
}

export default App
