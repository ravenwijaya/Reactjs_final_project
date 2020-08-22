import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { MovieContext } from "../context/MovieContext";
import Link from '@material-ui/core/Link';
import {useParams} from "react-router-dom";
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
    let { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const[dataMovies, setdataMovies,
  statusForm, setStatusForm] =  useContext(MovieContext)
  const [movie,setMovie]=useState(null)
        
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
  useEffect(()=>{
    if ( movie===null){
      axios.get(`https://backendexample.sanbersy.com/api/movies/${id}`).then(res=>{
        console.log(res)
        const newData = res.data
        setInput(  { title: newData.title, 
          description: newData.description,
           year: newData.year,
             duration: newData.duration, 
             genre: newData.genre, 
             rating: newData.rating, 
             review: newData.review, 
              image_url: newData.image_url}
                )

          setMovie(newData);
          console.log(newData)
      })
    
  }})

  return (
    <>
   
    <div className={classes.root}>
   
          
              
                <div style={{  display: "block",textAlign:"center"}}>
                <Typography gutterBottom variant="h3">
                      <strong> {input.title}</strong>
                      </Typography>
                <img src= {input.image_url} style={{width:"150px", height:"250px"}}/>
                
                </div>
              
                

                      <Typography variant="body2" gutterBottom>
                      <strong>Rating: </strong> {input.rating}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>Durasi: </strong>{minuteToHours(input.duration)}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>genre:</strong> {input.genre}
                      </Typography>
                      <Typography variant="body2" >
                        <p>
                          <strong>Deskripsi</strong>: 
                          {input.description}
                        </p>
                      </Typography>
                      <Typography variant="body2" >
                        <p>
                          <strong>Review</strong>: 
                          {input.review}
                        </p>
                      </Typography>
            
          </div>
  
    
      </>

  )
}








