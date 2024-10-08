import * as React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { addEvent } from './api/EventApi';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

const Event = (props) => {
    let title = props.event ? props.event.title : undefined
    let description = props.event ? props.event.description : undefined
    let startDate = props.event ? props.event.startDate : props.startWeek ? new moment(props.startWeek).day(props.id) : new moment()
    let endDate = props.event ? props.event.endDate : props.startWeek ? new moment(props.startWeek).day(props.id) : new moment()

    const [open, setOpen] = React.useState(props.isBtn);
    const [unDate, setUnDate] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const addNewEvent = async (userId) => {
        if (title === (undefined || "") || description === undefined || startDate === undefined || endDate === undefined) {
            setUnDate(true)
            return;
        }
        if (endDate < startDate) {
            setUnDate(true)
            return;
        }
        const event = {
            eventId: props.event ? props.event.eventId : uuid(),
            userId: localStorage.getItem('userId'),
            title,
            description,
            startDate,
            endDate
        }
        const status = await addEvent(event)
        props.refetch()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const setTime = () => {
        setUnDate(false)
    }

    return (
        <React.Fragment>
            {unDate && <Alert severity="error" onClose={setTime} display="n">
                Error
            </Alert>}
            {props.icon ?
                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton> :
                !open &&
                <Tooltip placement="top">
                    <Button variant="text" color="secondary" onClick={handleClickOpen}>
                        new event
                    </Button>
                </Tooltip>
            }
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"📆 Event"}
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth id="title"
                        label="Event title" variant="filled" color="secondary"
                        defaultValue={props.event ? props.event.title : null}
                        onBlur={(e) => { title = e.target.value }} />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <br /><br />
                        <DemoContainer components={['DateTimePicker']} color="secondary.main">
                            <DateTimePicker
                                label="Start Date&Time" color="secondary.main"
                                defaultValue={new moment(startDate)}
                                onChange={(e) => { startDate = e }} />
                        </DemoContainer>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="End Date&Time" color="secondary"
                                defaultValue={new moment(endDate)}
                                onChange={(e) => { endDate = e }} />
                        </DemoContainer>
                        <br /><br />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            color="secondary"
                            defaultValue={props.event ? props.event.description : null}
                            multiline
                            rows={4}
                            placeholder="With whom, where, etc."
                            fullWidth
                            onBlur={(e) => { description = e.target.value }}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => { handleClose(); addNewEvent(props.userId) }} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default Event