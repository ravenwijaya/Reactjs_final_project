import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import "./Movies.css"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import SortIcon from '@material-ui/icons/Sort';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
  
  table: {
    minWidth: 650,
  },

root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));
const Games = () => {
  const[dataGame, setdataGame]=   useState(null)
  const[dataGames, setdataGames,statusForm, setStatusForm] =  useContext(GameContext)

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const [singlePlayer, setSinglePlayer] = React.useState(1);
  const [tahunMin, setTahunMin] = React.useState(1990);
  const [multiPlayer, setMultiPlayer] = React.useState(1);
  const [tahunMax, setTahunMax] = React.useState(2020);
 

  const [search, setSearch] = React.useState("");
        
  const[sort, setSort]=   useState("")
  const[sortName, setSortName]=   useState("")
  useEffect(() => {
    if (dataGame === null ) {
      axios.get(`https://backendexample.sanbersy.com/api/games`)
        .then(res => {
          const newData = res.data.map((el) => { return el}) ;

          setdataGame(newData);
     
        })
    }
  })
  const [input, setInput]  =  useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    review:"",
    image_url:""
  })

const handlefilter=()=>{

        let filteredmov=dataGames.filter(x=>x.singlePlayer === parseInt(singlePlayer)&&x.multiplayer === parseInt(multiPlayer)
                                           && parseInt(x.release)>=tahunMin&& parseInt(x.release)<=tahunMax
                                     )
                                     console.log()
        setdataGame(...[filteredmov])
        handleClose1()

}
const handlefind=()=>{

          let filteredmov=dataGame.filter(x=>x.name.toLowerCase()===search.toLowerCase())
          setdataGame(...[filteredmov])
          console.log(filteredmov)
          setSearch("")
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose1 = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  
  const handleSinglePlayer = (event) => {
    setSinglePlayer(event.target.value);
  };

  const handleMultiPlayer= (event) => {
    setMultiPlayer(event.target.value);
  };

  const handleTahunMin = (event) => {
    setTahunMin(event.target.value);
  };

  const handleTahunMax = (event) => {
    setTahunMax(event.target.value);
  };



  const handleSearch = (event) => {
   
    setSearch(event.target.value);
 
  };

 
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newMovies = dataGame.filter(el => el.id != itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/games/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setdataGame([...newMovies])
      
    }
    
    const handleEdit = () =>{
      setStatusForm("edit")
    }

    return(
      <> <Link to={`/game/edit/${itemId}`}>
      <Button  style={{maxWidth: '80px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',background:"#ff8000",color:"white"}}  variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleEdit}>
     Edit
      </Button></Link>
       
       <br/>   
        <Button style={{maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} color="secondary" variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleDelete}>
     Delete
      </Button>
      <br/> <br/>
      </>
    )
  }

  const handlesortname=(event)=>{
    setSortName(event.target.value);

    }
    
    const handlesorttype=(event)=>{
      setSort(event.target.value);
  
      }

  const handlesort=()=>{
let name=sortName
let type=sort
if(type==="asc"){
  if(name==="name"){
    let filteredmov=dataGames.sort(function(a, b){
      return a.name.localeCompare(b.name)
   
    })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="singleplayer"){

    let filteredmov=dataGames.sort(function(a, b){
      return a.singlePlayer-b.singlePlayer
    })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="multiplayer"){
    let filteredmov=dataGames.sort(function(a, b){
      return a.multiplayer-b.multiplayer
    })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="genre"){
    let filteredmov=dataGames.sort(function(a, b){
      return a.genre.localeCompare(b.genre)
  })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="platform"){
    let filteredmov=dataGames.sort(function(a, b){
      return a.platform.localeCompare(b.platform)
    })
  
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="release"){
    let filteredmov=dataGames.sort(function(a, b){
      if(a.release < b.release) { return -1; }
      if(a.release > b.release) { return 1; }
      return 0;
  })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }

}else if(type==="desc"){
  if(name==="name"){
    let filteredmov=dataGames.sort(function(a, b){
      return b.name.localeCompare(a.name)
  })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="singleplayer"){

    let filteredmov=dataGames.sort(function(a, b){
      return b.singlePlayer-a.singlePlayer
    })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="multiplayer"){
    let filteredmov=dataGames.sort(function(a, b){
      return b.multiplayer-a.multiplayer
    })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="genre"){
    let filteredmov=dataGames.sort(function(a, b){
      return b.genre.localeCompare(a.genre)
  })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="platform"){
    let filteredmov=dataGames.sort(function(a, b){
      return b.platform.localeCompare(a.platform)
    })
  
    setdataGame(...[filteredmov])
    setOpen2(false);
  }else if(name==="release"){
    let filteredmov=dataGames.sort(function(a, b){
      if(a.release > b.release) { return -1; }
      if(a.release < b.release) { return 1; }
      return 0;
  })
    setdataGame(...[filteredmov])
    setOpen2(false);
  }
  handleClose2()
}

            
    
      
    
    }
  

  return(
    <>
    {/* popup */}
     <React.Fragment>
 
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Silahkan isi filter 
          </DialogContentText>
          <form className={classes.form} noValidate style={{display:"inline"}}>
            <FormControl className={classes.formControl} >
              <InputLabel htmlFor="max-width">Single Player</InputLabel>
              <Select
                autoFocus
                value={singlePlayer}
                onChange={handleSinglePlayer}
              >
              
                <MenuItem value="1">yes</MenuItem>
                <MenuItem value="0">no</MenuItem>
              
              </Select>

            </FormControl>
           &nbsp; <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Multi Player</InputLabel>
              <Select
                autoFocus
                value={multiPlayer}
                onChange={handleMultiPlayer}
           
              >
              
              <MenuItem value="1">yes</MenuItem>
                <MenuItem value="0">no</MenuItem>
              
              </Select>

            </FormControl><br/><br/>

            <FormControl className={classes.formControl} style={{display:"inline"}}>
           
              <TextField
                  id="outlined-number"
                  label="Min Year"
                  type="number"
                  onChange={handleTahunMin} value={tahunMin}
                  variant="outlined"
                /> &nbsp; 
                <TextField
                    id="outlined-number"
                    label="Max Year"
                    type="number"
                    onChange={handleTahunMax} value={tahunMax}
                    variant="outlined"
                  />
      

            </FormControl><br/><br/>


            

           
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Close
          </Button>
          <Button onClick={handlefilter} color="primary">
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
{/* search */}

    <Paper component="form" className={classes.root} style={{margin:"auto"}} >
  
      <IconButton className={classes.iconButton} aria-label="menu"  onClick={handleClickOpen}>
        <MenuIcon />
      </IconButton>
      
      <InputBase
        className={classes.input}
        name="search"
        placeholder="Search"
     
        value={search}
        onChange={handleSearch}
      />
      <IconButton   onClick={handlefind}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions"onClick={handleClickOpen2}>
        <SortIcon />
      </IconButton>
    </Paper>

      <Link to="/game/create">
      <Button  startIcon={<AddIcon />}  style={{background:"#4CAF50",color:"white"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      New Game
      </Button></Link>
{/*  sort */}

      <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open2}
        onClose={handleClose2}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Sort</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Silahkan pilih sort 
          </DialogContentText>
          <form className={classes.form} noValidate style={{display:"inline"}}>
            <FormControl className={classes.formControl} >
              <InputLabel htmlFor="max-width">Sort by</InputLabel>
              <Select
                autoFocus
                value={sortName}
                onChange={handlesortname}>
              
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="genre">Genre</MenuItem>
                <MenuItem value="singleplayer">SinglePlayer</MenuItem>
                <MenuItem value="multiplayer">MultiPlayer</MenuItem>
                <MenuItem value="platform">Platform</MenuItem>
                <MenuItem value="release">Release</MenuItem>
                
              
              </Select>

            </FormControl>
           &nbsp; 
           <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Type</InputLabel>
              <Select
                autoFocus
                value={sort}
                onChange={handlesorttype}
              >
          
                <MenuItem value="asc">asc</MenuItem>
                <MenuItem value="desc">desc</MenuItem>
            
              </Select>

            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Close
          </Button>
          <Button onClick={handlesort} color="primary">
            Sort
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      <h1>Data Games</h1>
     
      
<TableContainer >
<Table className={classes.table} aria-label="simple table" padding="checkbox" >
  <TableHead>
    <TableRow>
      <TableCell >No</TableCell>
      <TableCell >Name</TableCell>
      <TableCell >Genre</TableCell>
      <TableCell >SinglePlayer</TableCell>
      <TableCell >MultiPlayer</TableCell>
      <TableCell >Platform</TableCell>
      <TableCell >Release</TableCell>
      <TableCell align="center">Image_url</TableCell>
     

      <TableCell align="center" >Action</TableCell>

    </TableRow>
  </TableHead>
  <TableBody>

    { dataGame !== null && dataGame.map((item,index) => (
      <TableRow key={index} padding="checkbox" >
      <TableCell  > {index+1} </TableCell>
        <TableCell  >{item.name}</TableCell>
        <TableCell >{item.genre}</TableCell>
        <TableCell >{item.singlePlayer}</TableCell>
        <TableCell  >{item.multiplayer}</TableCell>
        <TableCell  >{item.platform}</TableCell>
        <TableCell   >{item.release}</TableCell>
        <TableCell   ><p>{item.image_url} </p></TableCell>
       
        <TableCell align="right" > <Action itemId={item.id} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>

    </>
  )
}

export default Games
