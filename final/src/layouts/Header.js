import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import TableChartIcon from '@material-ui/icons/TableChart';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
   
  
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Header =() =>{
  
  const [user, setUser,
         daftarUser, setDaftarUser] = useContext(UserContext)
//  console.log(user)

  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return(    
    <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="fixed"
     
      style={{ background: '	#000000' }}
    >
      <Toolbar >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Movies and Games
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />

      <ListItem >
      <ListItemIcon>  
      <Avatar className={classes.orange}>{user.username.charAt(0)}</Avatar>
      </ListItemIcon>
           <h1><a>{user.username}</a></h1>
      </ListItem>

      <Divider />

      <Link to="/"style={{textDecoration:"none",color:"black"}}>
      <ListItem button> 
      <ListItemIcon>  < HomeIcon /> </ListItemIcon>
      <ListItemText primary="Home" />
      </ListItem>
      </Link> 

      <Divider />

     
      <ListItem >
      <h2 style={{marginBottom:"-5px",marginTop:"-5px"}} >Movie</h2>
      </ListItem>

      <Divider />

      { user &&  
      <Link to="/movielist"style={{textDecoration:"none",color:"black"}}>
      <ListItem button>
      <ListItemIcon>  < LocalMoviesIcon /> </ListItemIcon>
      <ListItemText primary="Movie List" />
      </ListItem>
      </Link>  
      }
 <Divider />
      { user &&  
      <Link to="/movie"style={{textDecoration:"none",color:"black"}}>
      <ListItem button>
      <ListItemIcon >  < TableChartIcon /> </ListItemIcon>
      <ListItemText primary="Movie Table Data" />
      </ListItem>
      </Link>
      }
 <Divider />
      <ListItem >
      <h2 style={{marginBottom:"-5px",marginTop:"-5px"}}>Game</h2>
      </ListItem>

      <Divider />
      { user && 
      <Link to="/gamelist"style={{textDecoration:"none",color:"black"}}>
      <ListItem button>
      <ListItemIcon>  < SportsEsportsIcon /> </ListItemIcon>
      <ListItemText primary="Game List" />
      </ListItem>
      </Link>  
      }
       <Divider />
      { user && 
      <Link to="/game"style={{textDecoration:"none",color:"black"}}>
      <ListItem button>
      <ListItemIcon>  < TableChartIcon /> </ListItemIcon>
      <ListItemText primary="Game Table Data" />
      </ListItem>
      </Link>
      }

      {/* { user === null && 
      <ListItem button>
       <Link to="/login" style={{textDecoration:"none",color:"black"}}><ListItemText primary="Login" /></Link>
      </ListItem>} */}
     <Divider />
     { user &&
      <ListItem button onClick={handleLogout}  style={{marginTop:"15px"}}>
         <ListItemIcon>  <ExitToAppIcon /> </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>}

      { user && 
      <Link to="/changepassword"style={{textDecoration:"none",color:"black"}}>
      <ListItem button>
      <ListItemIcon> <LockIcon /> </ListItemIcon>
      <ListItemText primary="Change Password" />
      </ListItem>
      </Link>
      }
       {/* <Link to="/about"style={{textDecoration:"none",color:"black"}}> */}
      <ListItem button > 
      <ListItemIcon>  < InfoIcon /> </ListItemIcon>
      <ListItemText primary="About" />
      </ListItem>
      {/* </Link>   */}
   



      
    </Drawer>
    
  </div>






  )
}

export default Header
