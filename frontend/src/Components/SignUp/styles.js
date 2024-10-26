import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    background: 'linear-gradient(130deg, rgb(46, 186, 198), rgb(182, 80, 158), rgb(46, 186, 198))'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));