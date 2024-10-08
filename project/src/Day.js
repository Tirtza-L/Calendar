import React from 'react';
import ContextMenu from "./ContextMenu";
import moment from "moment";
import ListE from './ListE'

const Day = ({ id, startWeek, today, todaysEvents, GoToToday, refetch, ...props }) => {
    const style = {
        p: 0,
        width: '100%',
        maxWidth: 360,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'End',
        backgroundColor:'background.paper',        
    };
    const componentToSetMenu = () => {
        console.log("todaysEvents " + todaysEvents);
        
        return (<>
            <div id={id} style={{height: "500px",  width:"260px" }} className="day">
                <h2 className="title" style={{color:"#9C27B0"}} >{today.split(' ')[0]} </h2>
                <h3 className="title">{today.split(' ')[1]+" "+ today.split(' ')[2]} </h3>
                <ListE id={id} startWeek={startWeek} refetch={refetch} events={todaysEvents.filter(e => (today == new moment(e.startDate).format("dddd D MMMM")))}  today={today}/>
            </div>
        </>
        )
    }

    return (
        <>
            <ContextMenu u id={id} startWeek={startWeek} refetch={refetch} key={id} GoToToday={GoToToday} contextComponent={componentToSetMenu}></ContextMenu>
        </>
    )
}

export default Day



