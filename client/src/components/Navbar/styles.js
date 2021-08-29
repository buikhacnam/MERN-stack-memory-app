import { deepPurple } from '@material-ui/core/colors'
import { alpha, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
	appBar: {
		marginTop: '0px',
		marginBottom: '20px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '5px 50px',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
    boxShadow: 'none',
	},
	heading: {
		color: '#f50057',
		textDecoration: 'none',
		fontSize: '1.8em',
		fontWeight: 300,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	image: {
		marginLeft: '10px',
		marginTop: '5px',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '400px',
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
		},
	},
	profile: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '400px',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
			marginTop: 20,
			justifyContent: 'center',
		},
	},
	logout: {
		marginLeft: '20px',
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		marginLeft: '5px',
	},
	brandContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},

	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}))
