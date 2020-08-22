import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
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
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const [user, setUser,daftarUser, setDaftarUser] = useContext(UserContext)
  const [input, setInput] = useState({username: "" , password: "", oldpassword:""})
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    

    let username = input.username
    let password = input.password
    let oldpassword = input.oldpassword
    let created_at = date.concat(" ", time);
    let updated_at=""
    if (username.replace(/\s/g,'') !== "" && password.replace(/\s/g,'')!== "" && oldpassword.replace(/\s/g,'')!== ""){
      let newDaftarUser = daftarUser
 
  let datauser=daftarUser.find(x=>x.username===input.username)
     if(datauser.password===oldpassword){
      newDaftarUser = [...newDaftarUser, { updated_at,password }]
      axios.put(`https://backendexample.sanbersy.com/api/users/${datauser.id}`, {updated_at, password})

     }else{
      handleClickOpen()
     }
      setDaftarUser(newDaftarUser)
      setInput({...input, username: ""})
      setInput({...input, password: ""})
      setInput({...input, oldpassword: ""})
    }


  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "username":{
        setInput({...input, username: value})
        break;
      } 
      case "oldpassword":{
        setInput({...input, oldpassword: value})
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ChangePassword
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                
                label="Username"
                type="text" name="username" onChange={handleChange} 
                value={input.username}
               
              />
            </Grid> 
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
               
                label="Old Password"
                type="password" name="oldpassword" onChange={handleChange} 
                value={input.oldpassword}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
               
                label="New Password"
                type="password" name="password" onChange={handleChange} 
                value={input.password}
                
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            className={classes.submit}
            onClick={handleSubmit} variant="contained" color="primary"
          >
           Change
          </Button>
        
        </form>
      </div>
      <Box mt={5}>
  
      </Box>
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
           Username atau Password Salah
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