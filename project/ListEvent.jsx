import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import axios from 'axios';
import Event from './Event';
import ContextMenu from './ContextMenu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';



const ListEvent = (props) => {
    const [addEvent, setAddEvent] = React.useState(false);

    const [contextMenu, setContextMenu] = React.useState(null);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    const deletEvent = (eventId) => {
        try {
            axios.delete(`http://localhost:5102/Event/${eventId}`)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        //alert("deleted")
                        props.refetch()
                    }

                })
        } catch (error) {
            console.log("error");
        }
    }
    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu({
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        });
      };
    
    const handleClosem = () => {
        setContextMenu(null);
      };
    return (
        <>
            <Demo>
                <List dense={dense}>
                    {props.list.map((value) =>
                        <ListItem  key={value} onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
                           
                            <ListItemText onClick={handleClickOpen} variant="body2"
                                primary={`${value.title} `}
                                secondary={moment(value.time).format("h:mma")}
                            />
                            <Event Button="true" type="edit" event={value} dat={moment(value.startDate).add(-1, 'd')} refetch={props.refetch} onClick={() => deletEvent(value.eventId)} />
                            <IconButton edge="end" aria-label="delete" onClick={() => deletEvent(value.eventId)} >
                                <DeleteIcon />
                            </IconButton>
                             <Menu
                                open={contextMenu !== null && !addEvent} // Only open the menu if addEvent is false
                                onClose={handleClosem}
                                anchorReference="anchorPosition"
                                anchorPosition={
                                    contextMenu !== null
                                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                        : undefined
                                }
                            >
                                <MenuItem onClick={() => deletEvent(value.eventId)}>  <DeleteIcon /> Delete Event </MenuItem>
                                {/* <MenuItem onClick={() => deletEvent(value.eventId)}> Edit Event </MenuItem> */}
                                {/* <MenuItem onClick={handleOnClickToday}>Go to today</MenuItem> */}
                            </Menu>
                        </ListItem>,
                    )}
                </List>
            </Demo>
            {/* <React.Fragment> */}
            
            <Dialog open={open} onClose={handleClose} anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {/* Display event details */}
          {/* ... */}

          {/* Close button */}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
      {/* </React.Fragment> */}
        </>


    )
}
export default ListEvent