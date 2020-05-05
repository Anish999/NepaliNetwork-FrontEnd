import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useFormik } from 'formik';
import AuthContext from '../../context/auth-context';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SimpleDialog from '../../shared/components/dialog/SimpleDialog';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link to='/'>NetworkOverflow </Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'red'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: 'black'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  multilineColor: {
    color: 'black'
  }
}));

const SignIn = props => {
  let history = useHistory();
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 character long';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async user => {
      login(user);
    }
  });

  const hideDialogBox = () => {
    setShowDialog(false);
  };

  const showDialogBox = (title, message) => {
    setShowDialog(true);
    setDialogMessage(message);
    setDialogTitle(title);
  };

  const context = useContext(AuthContext);

  const login = async user => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axios
      //.post(`${process.env.REACT_APP_API}/api/login`, user, config)
      .post(`http://localhost:5000/api/login`, user, config)
      .then(res => {
          if (res.data.message) {
            return showDialogBox('Warning', res.data.message);
          }
          const token = 'Bearer ' + res.data.result.token;
          localStorage.setItem('token', token);
          context.setIsLoggedIn(true);
          //showDialogBox('Success', 'Logged in successfully');
          history.push('/dashboard');
        })
        .catch(error => {});
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div>
        {showDialog ? (
          <SimpleDialog
            open={showDialog}
            message={dialogMessage}
            title={dialogTitle}
            hide={hideDialogBox}
          ></SimpleDialog>
        ) : null}
      </div>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            multiline
            InputProps={{
              className: classes.multilineColor
            }}
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          {formik.errors.email ? (
            <div className='form-error'>{formik.errors.email}</div>
          ) : null}

          <TextField
            variant='outlined'
            margin='normal'
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            required
            fullWidth
            InputProps={{
              className: classes.multilineColor
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          {formik.errors.password ? (
            <div className='form-error'>{formik.errors.password}</div>
          ) : null}

          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signUp' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
