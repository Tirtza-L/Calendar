import moment from "moment/moment";
import Day from "./Day";
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Week = (props) => {
    const week = [0, 1, 2, 3, 4, 5, 6]
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (<>
            <Box sx={{ width: '100%', position: "center", marginRight: "auto", marginLeft: "auto" }}>
                <Stack
                    direction="row"
                    id="week"
                    divider={<Divider orientation="horizontal" flexItem />}
                    spacing={0.5}
                >
                    {week.map((day, i) => {
                        return <>
                            <Item  >
                                <Day
                                    id={i}
                                    key={i}
                                    startWeek={new moment(props.startWeek)}
                                    today={new moment(props.startWeek).day(day).format("dddd D MMMM")}
                                    setEvents={props.setEvents}
                                    todaysEvents={props.events}
                                    realDate={props.today}
                                    GoToToday={props.GoToToday}
                                    loadEvents={props.loadEvents}
                                    refetch={props.refetch}
                                />
                            </Item>
                        </>
                    })}

                </Stack>
            </Box>
    </>)
}

export default Week