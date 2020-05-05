import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import PersonIcon from "@material-ui/icons/Person";

import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textBox: {
    color: "black",
    height: 60,
    fontSize: "1.5em",
  },
  timeBox: {
    color: "black",
    height: 60,
    marginTop: "2px",
  },
  dialogHeader: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "black",
  },
}));

const EventDetails = (props) => {
  console.log(props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Explore More
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        minWidth={"lg"}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "black" }}>
          {props.eventInfo.title}
        </DialogTitle>
        <DialogContent style={{ color: "black" }}>
          <DialogContentText className={classes.dialogHeader}>
            <img src={props.eventInfo.image}></img>
            Event Information
          </DialogContentText>
          <h4>{props.eventInfo.description}</h4>
          <h4>Start Date : {props.eventInfo.startDate} </h4>
          <h4>End Date : {props.eventInfo.endDate}</h4>
          <h2>Contact Details </h2>

          <h4>
            <IconButton aria-label="add to favorites">
              <PersonIcon />
            </IconButton>
            Name of the poster
          </h4>
          <h4>
            <IconButton aria-label="add to favorites">
              <EmailIcon />
            </IconButton>
            test@test.com
          </h4>
          <h4>
            <IconButton aria-label="add to favorites">
              <CallIcon />
            </IconButton>
            {props.eventInfo.eventCreator}
          </h4>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EventDetails;
