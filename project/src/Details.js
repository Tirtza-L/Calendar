import * as React from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PendingIcon from '@mui/icons-material/Pending';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

export default function Details(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="pending" size="small"onClick={handleClickOpen} >
        <PendingIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{width:"500px", left:"35%"}}
        maxWidth="81200px"
      >
        <DialogTitle id="alert-dialog-title" color="secondary.main" >
          {props.event.title}
        </DialogTitle>
        _______________________________________________<br/>
        <DialogContent>
          <Typography>On:
            {new moment(props.event.startDate).format("  DD MMMM")}
            </Typography>
          <DialogContentText id="alert-dialog-description"> At: 
          {new moment(props.event.startDate).format("hh:mm")}
          </DialogContentText>
          <Typography>till:
            {new moment(props.event.endDate).format("  DD MMMM")}
            </Typography>
          <DialogContentText id="alert-dialog-description"> At: 
          {new moment(props.event.endDate).format("hh:mm")}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description"><br/>
          {props.event.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  color="secondary" onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}