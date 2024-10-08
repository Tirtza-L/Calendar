import { useState, useRef } from "react";
import moment from "moment/moment";
import React from "react";
import Event from "./Event";
import Week from "./Week";
import useAxios from 'axios-hooks'
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

const Calender = () => {
    const today = moment()
    const [startWeek, setStartWeek] = useState(today.startOf('week'));
    const userId = useRef(localStorage.getItem('userId'));
    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:5102/Event/${userId.current}`
    )

    const setWeek = (index) => {
        let newStart = new moment(startWeek).day(index)
        console.log('newStart', newStart);
        setStartWeek(newStart)
    }

    const GoToToday = () => {
        setStartWeek(today.startOf('week'))
    }

    return (
        <>{!loading && <>
            <br />
            <Typography component="h1" variant="h3" style={{ textAlign: "center", color: "darkgrey" }}>{startWeek.format("MMM YYYY")}</Typography><br />
            <br />
            <div >
                <Button variant="text" color="secondary" onClick={() => setWeek(-7)}>◀</Button>
                <Button variant="contained" sx={{ m: 1 }} color="secondary" onClick={() => setStartWeek(today.startOf('week'))}>Today</Button>
                <Button variant="text" color="secondary" onClick={() => setWeek(7)}>{"▶"}</Button>
                <Event
                    isBtn={false}
                    userId={userId.current}
                    refetch={refetch} />
            </div>
            <br />
            <Week
                startWeek={new moment(startWeek)}
                events={data.value}
                GoToToday={GoToToday}
                refetch={refetch}
                style={{ position: "center", marginRight: "auto", marginLeft: "auto" }}
            /></>}
        </>
    )
}

export default Calender