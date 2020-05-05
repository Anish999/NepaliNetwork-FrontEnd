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
import CitySelect from '../../../views/dashboard/components/locationSearch';
import jwt_decoded from 'jwt-decode';
import FormControl from '@material-ui/core/FormControl';

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
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState({ location: '' });
  const [user, setUser] = React.useState({
    email: '',
    id: '',
    firstName: '',
    lastName: '',
  });
  const [address, setAddress] = React.useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const validate = (values) => {
    const errors = {};

    if (!values.eventName) {
      errors.eventName = 'Required';
    }
    if (!values.eventSummary) {
      errors.eventSummary = 'Required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      eventName: '',
      eventSummary: '',
      eventStartDate: Date.now(),
      eventEndDate: Date.now(),
      eventImage: '',
    },
    validate,
    onSubmit: async (event) => {
      createEvent(event);
    },
  });

  // const printEvent = async (event) => {
  //   await getUser();
  //   await createAddress();
  //   await createEvent(event);
  // };

  const hideDialogBox = (title) => {
    setShowDialog(false);
    if (title === 'Success') {
      handleClose();
      props.render();
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

  const handleImage = (event) => {
    const data = new FormData();
    if (event.target.files) {
      data.append('profileImage', event.target.files[0]);
    }
    imageUpload(data);
  };

  const handleStreetAddress = (event) => {
    const street = event.target.value;
    setAddress((prevState) => {
      return {
        ...prevState,
        street: street,
      };
    });
  };

  const handleCity = async (value) => {
    await setAddress((prevState) => {
      return {
        ...prevState,
        city: value.city,
        state: value.state,
      };
    });
  };

  const createEvent = async (data) => {
    try {
      await getUser();
    } catch (error) {
      console.log('Could not find logged in user', error);
    }
    try {
      await createAddress();
    } catch (error) {
      console.log('Something went wrong!', error);
    }
    data = {
      ...data,
      eventImage: image.location !== '' ? image.location : defaultImage,
      eventCreator: _uid,
      eventVenue: _aid,
    };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios
        .post(`http://localhost:5000/api/events`, data, config)
        .then((res) => {
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
  let _uid;
  const getUser = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decoded = jwt_decoded(token);

      const data = decoded.email;

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        await axios
          .get(`http://localhost:5000/api/users/${data}`, config)
          .then((res) => {
            const user = res.data.user;
            setUser({
              email: user.email,
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
            });
            _uid = user._id;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  let _aid;
  const createAddress = async () => {
    const data = address;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios
        .post(`http://localhost:5000/api/addresses`, data, config)
        .then((res) => {
          const id = res.data.address.id;
          setAddress((prevState) => {
            return {
              ...prevState,
              addressId: id,
            };
          });
          _aid = id;
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
          console.log(JSON.stringify(res.data));
          console.log(res.data.location);
          setImage({ location: res.data.location });
        })
        // .then((resData) => {
        //   console.log('Success ');
        // })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Create Event
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
              Event Info
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin='dense'
              id='name'
              label='Title'
              name='eventName'
              type='text'
              fullWidth
              variant='outlined'
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
              id='description'
              label='Description'
              name='eventSummary'
              multiline
              rows='2'
              type='text'
              fullWidth
              variant='outlined'
              InputProps={{
                className: classes.textBox,
              }}
              onChange={formik.handleChange}
            />
            {formik.errors.eventSummary ? (
              <div className={classes.multilineColor}>
                {formik.errors.eventSummary}
              </div>
            ) : null}

            <FormControl variant='outlined'>
              <TextField
                margin='dense'
                id='street'
                label='Street Address'
                name='street'
                type='text'
                fullWidth
                variant='outlined'
                InputProps={{
                  className: classes.textBox,
                }}
                onChange={handleStreetAddress}
              />
              <div style={{ alignSelf: 'center' }}>
                <CitySelect setAddress={(address) => handleCity(address)} />
              </div>
            </FormControl>

            <TextField
              required
              id='datetime-start'
              label='Start Date-Time'
              name='eventStartDate'
              type='datetime-local'
              defaultValue={new Date().toISOString().slice(0, -1)}
              variant='outlined'
              margin='dense'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: classes.timeBox,
              }}
              onChange={formik.handleChange}
            />
            <TextField
              required
              margin='dense'
              id='datetime-end'
              label='End Date'
              name='eventEndDate'
              type='datetime-local'
              defaultValue={new Date().toISOString().slice(0, -1)}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: classes.timeBox,
              }}
              onChange={formik.handleChange}
            />
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
