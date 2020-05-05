import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import axios from 'axios';
import { useFormik } from 'formik';
import SimpleDialog from '../../shared/components/dialog/SimpleDialog';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link to='/'>NetworkOverflow </Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  multilineColor: {
    color: 'black',
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }
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

    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    validate,
    onSubmit: async (user) => {
      signup(user);
    },
  });

  const signup = async (user) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios
        .post(`${process.env.REACT_APP_API}/api/users/signUp`, user, config)
        .then((res) => {
          console.log('res: ', res);
          if (res.data.message) {
            return showDialogBox('Warning', res.data.message);
          }

          showDialogBox('Success', 'User added successfully');
        });
    } catch (error) {}
  };

  const showDialogBox = (title, message) => {
    setShowDialog(true);
    setDialogMessage(message);
    setDialogTitle(title);
  };

  const hideDialogBox = () => {
    setShowDialog(false);
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
          Sign up
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                InputProps={{
                  className: classes.multilineColor,
                }}
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />

              {formik.errors.firstName ? (
                <div className='form-error'>{formik.errors.firstName}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                InputProps={{
                  className: classes.multilineColor,
                }}
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />

              {formik.errors.lastName ? (
                <div className='form-error'>{formik.errors.lastName}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                InputProps={{
                  className: classes.multilineColor,
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
              />

              {formik.errors.email ? (
                <div className='form-error'>{formik.errors.email}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                InputProps={{
                  className: classes.multilineColor,
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <div className='form-error'>{formik.errors.password}</div>
              ) : null}

              <TextField
                autoComplete='phone'
                name='phoneNumber'
                variant='outlined'
                required
                fullWidth
                id='phoneNumber'
                label='Phone Number'
                InputProps={{
                  className: classes.multilineColor,
                }}
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.errors.phoneNumber ? (
                <div className='form-error'>{formik.errors.phoneNumber}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/signIn' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
