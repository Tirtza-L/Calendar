import React from 'react';
import axios from "axios";
import Event from "./Event";
import Details from "./Details";
import { deleteEvent } from './api/EventApi';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const ListE = (props) => {
    const [dense, setDense] = React.useState(false);
    const style = {
        p: 0,
        width: '100%',
        maxWidth: 360,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'End',
        backgroundColor: 'background.paper',
    };
    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    const DeleteEvent = async(event) => {
        // axios.delete(`/Event/${event.eventId}`)
        // .then((response) => {
        //     return response.data.statusCode
        // })
        // .catch((e) => {
        //     console.log(e)
        // })
        const status = await deleteEvent(event)
        //if (status === 200) {
            props.refetch()
    }

    return (
        <><Demo>
            <List dense={dense} >
                {props.events?.map((e, i) =>
                    <ListItem key={i}>
                        <ListItemText primary={e.title} />
                        <Details event={props.events[i]}/>
                        <IconButton aria-label="delete" size="small"onClick={() =>DeleteEvent(props.events[i])}>
                            <DeleteIcon />
                        </IconButton>
                        {<Event refetch={props.refetch} userId={localStorage.getItem('userId')} event={props.events[i]} isBtn={false} icon={true} loadEvents={props.loadEvents} id={props.id} startWeek={props.startWeek} />}
                    </ListItem>

                )}
            </List>
        </Demo>
        </>
    )
}

export default ListE