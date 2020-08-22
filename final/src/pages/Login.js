

import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";
import { useHistory } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDaftar = () => {
    history.push("/daftar"); 
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [user, setUser,daftarUser, setDaftarUser] = useContext(UserContext)
  const [input, setInput] = useState({username: "" , password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
  
    Axios.post(`https://backendexample.sanbersy.com/api/login`,{username:input.username,password:input.password})
    .then((res)=>{
      if(res.data==="invalid username or password"){
        handleClickOpen()
      }else{
        setUser(res.data)
        localStorage.setItem("user", JSON.stringify({username: input.username, password: input.password}))
      }

    })
 
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "username":{
        setInput({...input, username: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            type="text" name="username" onChange={handleChange} value={input.username}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth 
            label="Password"
            type="password" name="password" onChange={handleChange} value={input.password}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button

            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Change Password 
              </Link>
            </Grid> */}
            <Grid item>
           
        
           <a  onClick={handleDaftar } style={{cursor: "pointer"}} > Don't have an account? Sign Up</a>
          
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
       Cek Username dan Password anda
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        OK
      </Button>
    
    </DialogActions>
  </Dialog>
  </>
  );
}





