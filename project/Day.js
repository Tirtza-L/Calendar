import { useContext, useEffect } from "react";
import ContextMenu from "./ContextMenu";
import UserContext from "./UserContext";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card } from "@mui/material"
import { Height } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ListEvent from "./ListEvent";
import PluseIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { createSvgIcon } from '@mui/material/utils';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Event from "./Event";
import React from "react";
const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);
const Day = (props) => {
  const { user } = useContext(UserContext)
  const [addEvent, setAddEvent] = React.useState(false);
  const componentToSetMenu = () =>
    <Card sx={{ minWidth: 100, minHeight: 790, boxShadow: 4 ,position: "relative"}} >
      <CardContent >
    
        <Typography sx={{ fontSize: 20 }} color="ButtonText" gutterBottom>
          {props.day === "Saturday" ? "Sabath 🕯🕯" : props.day}
        </Typography>
        <Typography variant="body2">
          {props.date}
          <br />
          <br />
          <br />
        </Typography>
        <Typography variant="body2">
          <ListEvent  list={props.events.sort()} refetch={props.refetch} />
        </Typography>
        </CardContent>
        <Typography variant="body2" sx={{position: "absolute",
  bottom: 20,
  right: 20
  }}>
          <Fab color="primary" aria-label="add" size="2" minHeight="2">
            <AddIcon onClick={()=>{setAddEvent(true)}} />
            {/* <PlusIcon/> */}
          </Fab>
        </Typography>
     
    </Card>
  return (<>
    {addEvent && <Event Button={false} dat={props.dat} refetch={props.refetch} event={{}} setShowAlert={props.setShowAlert}/>}
    <ContextMenu setShowAlert={props.setShowAlert} contextComponent={componentToSetMenu} fToDay={props.fToDay} refetch={props.refetch} d={props.dat} ty></ContextMenu >
    </>
  )
}
export default Day
