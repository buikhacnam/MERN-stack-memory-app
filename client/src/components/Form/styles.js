import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: '20px',
    boxShadow: 'none',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
    marginBottom: '0',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
			display: 'unset',
		},

  },
  buttonSubmit: {
    [theme.breakpoints.down('sm')]: {
			float: 'right',
      marginTop: '10px'
		},
  },
}));