import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  creatorImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px',
  },
}));

const RoommateDetails = (props) => {
  //console.log(props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userState, setUser] = React.useState({
    email: '',
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  let user;
  const getUser = async () => {
    const data = props.roommateInfo.creatorId;
    //console.log(data);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios
        .get(`http://localhost:5000/api/users/id/${data}`, config)
        .then((res) => {
          user = res.data.user;
          //console.log(user);
          setUser({
            email: user.email,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            image: user.profileImage,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (userState.firstName === '') {
    getUser();
  }
  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Explore More
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        minWidth={'lg'}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' style={{ color: 'black' }}>
          <h3>{props.roommateInfo.listingType} Bedroom Apartment</h3>
        </DialogTitle>
        <DialogContent style={{ color: 'black' }}>
          <DialogContentText className={classes.dialogHeader}>
            <img src={props.roommateInfo.image}></img>
            Event Information
          </DialogContentText>
          <h4>{props.roommateInfo.description}</h4>
          <h4>
            Location: {props.roommateInfo.street}, {props.roommateInfo.city},{' '}
            {props.roommateInfo.state}
          </h4>
          <h4>Posted on : {props.roommateInfo.datePosted}</h4>
          <h2>Contact Details </h2>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h4>
                <IconButton aria-label='add to favorites'>
                  <PersonIcon />
                </IconButton>
                {/* UserName */}
                {userState.firstName} {userState.lastName}
              </h4>
              <h4>
                <IconButton aria-label='add to favorites'>
                  <EmailIcon />
                </IconButton>
                {userState.email}
              </h4>
              <h4>
                <IconButton aria-label='add to favorites'>
                  <CallIcon />
                </IconButton>
                {props.roommateInfo.contactNumber}
              </h4>
            </Grid>
            <Grid item xs={6}>
              <img className={classes.creatorImage} src={userState.image} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RoommateDetails;
