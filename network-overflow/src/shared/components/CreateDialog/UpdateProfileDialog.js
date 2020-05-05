import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useFormik } from 'formik';
import defaultImage from '../../../views/home/imagee.jpg';
import SimpleDialog from '../dialog/SimpleDialog';
import jwt_decode from 'jwt-decode';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'black',
  },
  textBox: {
    color: 'black',
    height: 60,
    fontSize: '1.5em',
  },
  timeBox: {
    color: 'black',
    height: 60,
    marginTop: '2px',
  },
  dialogHeader: {
    fontWeight: 'bold',
    fontSize: '24px',
    color: 'black',
  },
  multilineColor: {
    color: 'red',
  },
  multilineColor1: {
    color: 'black',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  profileImg: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    border: '1px solid #ddd',
    padding: '5px',
    '&:hover': {
      boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)',
    },
  },
  viewProfile: {
    // height: '300px',
    // width: '300px',
    borderRadius: '50%',
    border: '1px solid #ddd',
    padding: '5px',
    '&:hover': {
      boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)',
    },
    display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '300px',
  height: '300px',
  objectFit: 'none'
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState({ location: '' });
  const [userState, setUser] = React.useState({});
  const [count, setCount] = React.useState();

  const getUser = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decoded = jwt_decode(token);

      const data = decoded.email;

      try {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Allow-Control-Allow-Methods': '*',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        };
        await axios
          .get(`http://localhost:5000/api/users/${data}`, config)
          .then((res) => {
            const user1 = res.data.user;
            const u = {
              firstName: user1.firstName,
              lastName: user1.lastName,
              password: user1.password,
              email: user1.email,
              id: user1._id,
              hasPet: user1.hasPet,
              profileImage: user1.profileImage
                ? user1.profileImage
                : defaultImage,
            };

            if (!userState.email) {
              setUser(u);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validate = (values) => {
    const errors = {};

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      profileImage: userState.profileImage,
    },
    validate,
    onSubmit: async (user) => {
      editUser(user);
    },
  });

  const hideDialogBox = (title) => {
    setShowDialog(false);
    if (title === 'Success') {
      handleClose();

      //setCount(count+1);
      window.location.reload();
    }
  };

  const showDialogBox = (title, message) => {
    setShowDialog(true);
    setDialogMessage(message);
    setDialogTitle(title);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    const x = userState.hasPet;
    setUser((prevState) => {
      return {
        ...prevState,
        hasPet: !x,
      };
    });
  };

  const handleImage = (event) => {
    const data = new FormData();
    if (event.target.files) {
      data.append('profileImage', event.target.files[0]);
    }
    imageUpload(data);
  };

  const editUser = async (user) => {
    user = {
      email: userState.email,
      lastName: user.lastName === '' ? userState.lastName : user.lastName,
      firstName: user.firstName === '' ? userState.firstName : user.firstName,
      password: user.password === '' ? userState.password : user.password,
      profileImage:
        userState.profileImage !== '' ? userState.profileImage : defaultImage,
      id: userState.id,
      hasPet: userState.hasPet,
    };
    //console.log('I am here');
    console.log(user);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios
        .put(`http://localhost:5000/api/users`, user, config)
        .then((res) => {
          console.log(res.data);
          if (res.data.message) {
            return showDialogBox(res.data.code, res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          return showDialogBox('Warning', 'Something went wrong!');
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  const imageUpload = async (file) => {
    //console.log(file);
    try {
      await axios
        .post(`http://localhost:5000/api/profile/profile-img-upload`, file)
        .then((res) => {
          console.log(res.data.location);
          const l = res.data.location;
          setImage({ location: l });
          setUser((prevState) => {
            return {
              ...prevState,
              profileImage: l,
            };
          });
        })
        .then((resData) => {
          console.log('Success ');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  getUser();

  return (
    <div>
      <Button color='primary' onClick={handleClickOpen}>
        {/* <PersonIcon /> */}
        <img className={classes.profileImg} src={userState.profileImage} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
          
        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText className={classes.dialogHeader}>
              Edit your Profile
            </DialogContentText>
            <img className={classes.viewProfile} src={userState.profileImage} />
            <TextField
              required
              autoFocus
              margin='dense'
              id='name'
              label='FirstName'
              name='firstName'
              type='text'
              fullWidth
              variant='outlined'
              defaultValue={userState.firstName}
              InputProps={{
                className: classes.textBox,
              }}
              onChange={formik.handleChange}
            />
            {formik.errors.eventName ? (
              <div className={classes.multilineColor}>
                {formik.errors.eventName}
              </div>
            ) : null}

            <TextField
              required
              margin='dense'
              id='lastName'
              label='LastName'
              name='lastName'
              multiline
              rows='2'
              type='text'
              fullWidth
              variant='outlined'
              defaultValue={userState.lastName}
              InputProps={{
                className: classes.textBox,
              }}
              onChange={formik.handleChange}
            />
            <TextField
              disabled
              margin='dense'
              id='emmail'
              label='email'
              name='email'
              type='text'
              fullWidth
              variant='outlined'
              defaultValue={userState.email}
              InputProps={{
                className: classes.textBox,
              }}
              onChange={formik.handleChange}
            />
            {formik.errors.eventVenue ? (
              <div className={classes.multilineColor}>
                {formik.errors.eventVenue}
              </div>
            ) : null}
            {/* <TextField
              required
              id='password'
              label='password'
              name='password'
              type='password'
              defaultValue=''
              variant='outlined'
              margin='dense'
              defaultValue={user.password}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: classes.timeBox,
              }}
              onChange={formik.handleChange}
            /> */}

            <div>
              <Switch
                checked={userState.hasPet}
                onChange={handleChange}
                name='hasPet'
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />{' '}
              <h4 className={classes.multilineColor1}>Do you have pets?</h4>
            </div>
            <br />

            <TextField type='file' onChange={handleImage} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <div>
        {showDialog ? (
          <SimpleDialog
            open={showDialog}
            message={dialogMessage}
            title={dialogTitle}
            hide={() => hideDialogBox(dialogTitle)}
          ></SimpleDialog>
        ) : null}
      </div>
    </div>
  );
}
