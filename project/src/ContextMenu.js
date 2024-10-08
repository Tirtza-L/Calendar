import * as React from 'react';
import Event from './Event';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ContextMenu(props) {

    const [contextMenu, setContextMenu] = React.useState(null);
    const [Bool1, setBool1] = React.useState(false);

    const handleContextMenu = (event) => {
        setBool1(true)
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        );
    };

    const handleClose = (bool) => {
        setContextMenu(null);
    };

    const ContextComponent = props.contextComponent;

    return (
        <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
            <ContextComponent></ContextComponent>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                {Bool1 && <Event id={props.id} startWeek={props.startWeek} refetch={props.refetch}/> || <MenuItem onClick={() => { handleClose(true) }}>New Event</MenuItem>}

                <MenuItem sx={{color:"secondary.main"}} onClick={() => { handleClose(false); props.GoToToday()  }}>GO TO TODAY</MenuItem>
            </Menu>
        </div>
    );
}
