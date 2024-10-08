import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function SignUp() {

  const [FirstName, setFirstName] = React.useState('')
  const [LastName, setLastName] = React.useState('')
  const [UserId, setUserId] = React.useState('')
  const [Password, setPassword] = React.useState('')
  const [Email, setEmail] = React.useState('')
  const [Phone, setPhone] = React.useState('')

  const navigate = useNavigate()

  const AddUser = () => {
    if (UserId === '' || Password === '' || FirstName === '' || LastName === '' || Email === '' || Phone === '') {
      alert("Some details missing. Please fill it up.")
      return
    }

    const requestOptions = {
      UserId,
      Password,
      FirstName,
      LastName,
      Email,
      Phone
    }

    try {
      axios.post('http://localhost:5102/User/Register', requestOptions)
        .then((response) => {
          if (response.data.statusCode === 200) {
            localStorage.setItem('userId', UserId);
            localStorage.setItem('alert', false);
            navigate('/Calendar', { replace: false });
          }
          else {
            alert("register failed")
          }
        })
    }
    catch (e) {
      console.log(`error in axios:\n${e}`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const att = document.createAttribute("style");
  att.value = "color:red";

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  color="secondary"
                  autoFocus
                  onBlur={(e) => { setFirstName(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  color="secondary"
                  name="lastName"
                  autoComplete="family-name"
                  onBlur={(e) => { setLastName(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  color="secondary"
                  name="email"
                  autoComplete="email"
                  onBlur={(e) => { setEmail(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  color="secondary"
                  name="phone"
                  onBlur={(e) => { setPhone(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userId"
                  label="User Name"
                  color="secondary"
                  name="userId"
                  onBlur={(e) => { setUserId(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  color="secondary"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onBlur={(e) => { setPassword(e.target.value) }}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={AddUser}
              color="secondary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="../" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}