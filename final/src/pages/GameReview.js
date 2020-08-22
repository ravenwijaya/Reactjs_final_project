import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useParams} from "react-router-dom";


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
 
  const [game,setGame]=useState(null)
        
  const [input, setInput]  =  useState({
    name: "",
    genre: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform:"",
    release:"",
    image_url:""
  })
  useEffect(()=>{
    if ( game===null){
      axios.get(`https://backendexample.sanbersy.com/api/games/${id}`).then(res=>{
        console.log(res)
        const newData = res.data
        setInput({ 
          name: newData.name,
          genre: newData.genre,
          singlePlayer: newData.singlePlayer,
          multiplayer: newData.multiplayer,
          platform:newData.platform,
          release:newData.release.toString(),
          image_url:newData.image_url
        })

          setGame(newData);
          console.log(newData)
      })
    
  }})

  return (
    <>
   
    <div className={classes.root}>
   
          
              
                <div style={{  display: "block",textAlign:"center"}}>
                <Typography gutterBottom variant="h3">
                <strong> {input.name}</strong>
                </Typography>
                <img src= {input.image_url} style={{width:"150px", height:"250px"}}/>
                
                </div>
              
                

                      <Typography variant="body2" gutterBottom>
                      <strong>Genre: </strong> {input.genre}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>SinglePlayer: </strong>{input.singlePlayer ? "yes":"No"}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>MultiPlayer:</strong> {input.multiplayer ? "yes":"No"}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>Platform:</strong> {input.platform}
                      </Typography>
                      <Typography variant="body2" >
                      <strong>Release:</strong> {input.release}
                      </Typography>
                
                   
            
          </div>
  
    
      </>

  )
}








