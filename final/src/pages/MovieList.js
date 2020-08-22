import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
    
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function MovieList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const[dataMovies, setdataMovies,
  //   statusForm, setStatusForm] =  useState([])

    const[dataMovies, setdataMovies,
      statusForm, setStatusForm] =  useContext(MovieContext)
    // useEffect(() => {
    //   if (dataMovies.length === 0 ) {
    //     axios.get(`http://backendexample.sanbercloud.com/api/movies`)
    //       .then(res => {
    //         const newData = res.data.map((el) => { return el}) ;
  
    //         setdataMovies(newData);
   
    //       })
    //   }
    // })      
    //  console.log(dataMovies)  
  return (
    <>
   <div></div>
    <div className={classes.root}>
      {
        dataMovies.map((item)=>{
          return(
    
            <Paper className={classes.paper}  >
              <Grid container spacing={6}>
      
                <Grid item>
                
                   <img src= {item.image_url} style={{width:"150px", height:"250px"}}/>
                
                </Grid>
      
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={20}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                      <strong> {item.title}</strong>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                      <strong>Rating: </strong> {item.rating}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>Durasi: </strong>{minuteToHours(item.duration)}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>genre:</strong> {item.genre}
                      </Typography>
                      <Typography variant="body2" >
                        <p>
                          <strong>Deskripsi</strong>: 
                          {item.description}
                        </p>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                      <Link to={`/movie/review/${item.id}`} variant="body1">
                      <Button  style={{maxWidth: '80px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',background:"#ff8000",color:"white"}}  variant="contained" aria-controls="simple-menu" aria-haspopup="true">
   Review
      </Button>
              </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle1">$19.00</Typography>
                  </Grid> */}
                </Grid>
              </Grid>
            </Paper>
           
          )
        })
      }
          </div>
  
    
      </>

  );
}


