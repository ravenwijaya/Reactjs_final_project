import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import "./Movies.css"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
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
import Icon from '@material-ui/core/Icon';
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
    textAlign: "center",
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
const Movies = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const [ratingMin, setRatingMin] = React.useState(1);
  const [tahunMin, setTahunMin] = React.useState(1990);
  const [durasiMin, setDurasiMin] = React.useState(1);

  const [ratingMax, setRatingMax] = React.useState(10);
  const [tahunMax, setTahunMax] = React.useState(2020);
  const [durasiMax, setDurasiMax] = React.useState(300);
  const [search, setSearch] = React.useState("");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const[dataMovie, setdataMovie]=   useState(null)
  const[dataMovies, setdataMovies,
        statusForm, setStatusForm] =  useContext(MovieContext)
 
        
  const[sort, setSort]=   useState("")
  const[sortName, setSortName]=   useState("")
  useEffect(() => {
    if (dataMovie === null ) {
      axios.get(`https://backendexample.sanbersy.com/api/movies`)
        .then(res => {
          const newData = res.data.map((el) => { return el}) ;

          setdataMovie(newData);
     
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

        let filteredmov=dataMovies.filter(x=>x.rating>=parseInt(ratingMin) && x.rating<=parseInt(ratingMax)
                                           && x.year>=tahunMin &&x.year<=tahunMax
                                           && x.duration>=durasiMin &&x.duration<=durasiMax)
        setdataMovie(...[filteredmov])
        // console.log(dataMovie)
        handleClose1()

  

}
const handlefind=()=>{
  console.log(dataMovie.filter(x=>x.title.toLowerCase()===search.toLowerCase()))
          let filteredmov=dataMovie.filter(x=>x.title.toLowerCase()===search.toLowerCase())
          setdataMovie(...[filteredmov])
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

  
  const handleRatingMin = (event) => {
    setRatingMin(event.target.value);
  };

  const handleRatingMax = (event) => {
    setRatingMax(event.target.value);
  };

  const handleTahunMin = (event) => {
    setTahunMin(event.target.value);
  };

  const handleTahunMax = (event) => {
    setTahunMax(event.target.value);
  };

  
  const handleDurasiMin = (event) => {
    setDurasiMin(event.target.value);
  };

  const handleDurasiMax = (event) => {
    setDurasiMax(event.target.value);
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
      let newMovies = dataMovie.filter(el => el.id != itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/movies/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setdataMovie([...newMovies])
      
    }
    
    const handleEdit = () =>{
      // let singleMovie = dataMovies.find(x=> x.id === itemId)
 
      setStatusForm("edit")
    }

    return(
      <> <Link to={`/movie/edit/${itemId}`}>
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
  if(name==="description"){
    let filteredmov=dataMovies.sort(function(a, b){
      if(a.description < b.description) { return -1; }
      if(a.description > b.description) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="year"){

    let filteredmov=dataMovies.sort(function(a, b){
      return a.year-b.year
    })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="duration"){
    let filteredmov=dataMovies.sort(function(a, b){
      return a.duration-b.duration
    })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="genre"){
    let filteredmov=dataMovies.sort(function(a, b){
      if(a.genre < b.genre) { return -1; }
      if(a.genre > b.genre) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="rating"){
    let filteredmov=dataMovies.sort(function(a, b){
      return a.rating-b.rating
    })
  
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="review"){
    let filteredmov=dataMovies.sort(function(a, b){
      if(a.review < b.review) { return -1; }
      if(a.review > b.review) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="imageurl"){

    let filteredmov=dataMovies.sort(function(a, b){
      if(a.image_url < b.image_url) { return -1; }
      if(a.image_url > b.image_url) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="title"){

    let filteredmov=dataMovies.sort(function(a, b){
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }

}else if(type==="desc"){
  if(name==="description"){
    let filteredmov=dataMovies.sort(function(a, b){
      if(a.description > b.description) { return -1; }
      if(a.description < b.description) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="year"){

    let filteredmov=dataMovies.sort(function(a, b){
      return b.year-a.year
    })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="duration"){
    let filteredmov=dataMovies.sort(function(a, b){
      return b.duration-a.duration
    })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="genre"){
    let filteredmov=dataMovies.sort(function(a, b){
      if(a.genre > b.genre) { return -1; }
      if(a.genre < b.genre) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="rating"){
    let filteredmov=dataMovies.sort(function(a, b){
      return b.rating-a.rating
    })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="review"){
    let filteredmov=dataMovies.sort(function(a, b){
      if(a.review > b.review) { return -1; }
      if(a.review < b.review) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="imageurl"){

    let filteredmov=dataMovies.sort(function(a, b){
      if(a.image_url > b.image_url) { return -1; }
      if(a.image_url < b.image_url) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
    setOpen2(false);
  }else if(name==="title"){

    let filteredmov=dataMovies.sort(function(a, b){
      if(a.title > b.title) { return -1; }
      if(a.title < b.title) { return 1; }
      return 0;
  })
    setdataMovie(...[filteredmov])
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
              <InputLabel htmlFor="max-width">Min Rating</InputLabel>
              <Select
                autoFocus
                value={ratingMin}
                onChange={handleRatingMin}
                // inputProps={{
                //   name: 'max-width',
                //   id: 'max-width',
                // }}
              >
              
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
              </Select>

            </FormControl>
           &nbsp; <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Max Rating</InputLabel>
              <Select
                autoFocus
                value={ratingMax}
                onChange={handleRatingMax}
                // inputProps={{
                //   name: 'max-width',
                //   id: 'max-width',
                // }}
              >
                {/* <MenuItem value={false}>false</MenuItem> */}
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
              </Select>

            </FormControl><br/><br/>

            <FormControl className={classes.formControl} style={{display:"inline"}}>
              {/* <InputLabel htmlFor="max-width">Min Year</InputLabel> */}
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


            <FormControl className={classes.formControl} style={{display:"inline"}}>
          
              <TextField
                  id="outlined-number"
                  label="Min Duration"
                  type="number"
                  onChange={handleDurasiMin} value={durasiMin}
                  variant="outlined"
                /> &nbsp; 
                <TextField
                    id="outlined-number"
                    label="Max Duration"
                    type="number"
                    onChange={handleDurasiMax} value={durasiMax}
                    variant="outlined"
                  />
      

            </FormControl>
            

           
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

      <Link to="/movie/create">
      <Button  startIcon={<AddIcon />} style={{background:"#4CAF50",color:"white"}} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      New Movie 
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
              
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="year">Year</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="genre">Genre</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="imageurl">Image_url</MenuItem>
              
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
      <h1>Movie Table</h1>
   
      
<TableContainer  component={Paper}>
<Table className={classes.table} aria-label="simple table" >
  <TableHead>
    <TableRow>
      <TableCell >No</TableCell>
      <TableCell >Title</TableCell>
      <TableCell >Description</TableCell>
      <TableCell >Year</TableCell>
      <TableCell >Duration</TableCell>
      <TableCell >Genre</TableCell>
      <TableCell >Rating</TableCell>
      <TableCell >Review</TableCell>
      <TableCell >Image_url</TableCell>
      <TableCell align="center" >Action</TableCell>

    </TableRow>
  </TableHead>
  <TableBody>

    { dataMovie !== null && dataMovie.map((item,index) => (
      <TableRow key={index} padding="checkbox" >
      <TableCell  component="th" scope="row">
          {index+1}
        </TableCell>
        <TableCell  >{item.title}</TableCell>
        <TableCell  >{item.description}</TableCell>
        <TableCell >{item.year}</TableCell>
        <TableCell  >{item.duration}</TableCell>
        <TableCell  >{item.genre}</TableCell>
        <TableCell   >{item.rating}</TableCell>
        <TableCell   >{item.review}</TableCell>
        <TableCell   >{item.image_url}  </TableCell>
       
        <TableCell > <Action itemId={item.id} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>

    </>
  )
}

export default Movies
