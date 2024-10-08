import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Login = () => {
    const [userId, setUserId] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate()

    const getUser = () => {
        const requestOptions = {
            UserId: userId,
            Password: pwd
        };
        try {
            axios.post('http://localhost:5102/User/Login', requestOptions)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('alert', false);
                        navigate('/Calendar', { replace: false });
                    }
                    else {
                        <div style={{ fontFamily: "inherit" }}>You don't have an account yet.</div>
                        alert("You don't have an account yet.")
                        navigate("../SignUp", { replace: false });
                    }
                })
        }
        catch (e) {
            console.log(`error in axios:\n${e}`)
        }
    }

    return (
        <>
            <div style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <br />
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography><br />
                <TextField id="userId" label="User Name*" color="secondary" variant="outlined" size="medium" onChange={(e) => { setUserId(e.target.value) }} />{/*required={true}*/}
                <TextField id="pwd" label="Password*" color="secondary" variant="outlined" type="password" onChange={(e) => { setPwd(e.target.value) }} style={{ marginTop: "8px" }} /><br />
                <Button type="submit" variant="contained" color="secondary" onClick={getUser} style={{ width: "220px" }}>Login</Button>
            </div>
        </>
    )
}

export default Login