import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import "./Movies.css"

import { useHistory } from "react-router-dom";

import { GameContext } from "../context/GameContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {useParams} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
const Games = () => {
  let history = useHistory();
  let { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const[dataGames, setdataGames,statusForm, setStatusForm,] =  useContext(GameContext)
  const [game,setGame]=useState(null)
        
        
  const [input, setInput]  =  useState({
    
    name: "",
    genre: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform:"",
    release:1980,
    image_url:""
  })
 
  useEffect(()=>{
    if (statusForm === "edit" && game===null){
      axios.get(`https://backendexample.sanbersy.com/api/games/${id}`).then(res=>{
        
        const newData = res.data
        setInput({ 
          name: newData.name,
          genre: newData.genre,
          singlePlayer: newData.singlePlayer,
          multiplayer: newData.multiplayer,
          platform:newData.platform,
          release:newData.release,
          image_url:newData.image_url
      
        })

          setGame(newData);
          console.log(newData)
      })
    
  }})
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "singleplayer":
      {
        setInput({...input, singlePlayer: event.target.value});
        break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
          break
      }
      case "platform":
      {
        setInput({...input, platform: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "release":
        {
          setInput({...input, release: event.target.value});
            break
        }
    
          case "image_url":
            {
              setInput({...input, image_url: event.target.value});
                break
            }
    default:
      {break;}
    }
  }


  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    console.log(input)
   
    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/games`, {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform:input.platform,
          release:input.release.toString(),
          image_url:input.image_url
        })
        .then(res => {
            setdataGames([...dataGames, {id: res.data.id, ...input}]) 
            history.push("/game"); 
        })
       }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/games/${id}`, {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform:input.platform,
          release:input.release.toString(),
          image_url:input.image_url
        })
        .then(res => {
            let singleMovie = dataGames.find(el=> el.id === game.id)
            singleMovie.name = input.name
            singleMovie.singlePlayer = input.singlePlayer
            singleMovie.multiplayer = input.multiplayer
            singleMovie.platform = input.platform
            singleMovie.genre = input.genre
            singleMovie.release = input.release.toString()
            singleMovie.image_url=input.image_url
            setdataGames([...dataGames])
            history.push("/game");  })
        
      }
      
      setStatusForm("create")
  
      setInput({
        name: "",
    genre: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform:"",
    release:"",
    image_url:""
      })
    }

  }


  return(
    <>
  
      {/* Form */}
      <h1>Gamess Form</h1>
      <section>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            type="text" name="name" onChange={handleChange} value={input.name}
            autoFocus
          />
      
          <br/>
      
        </div>
 
        <div style={{display:"inline", float: "left"}}>
        <TextField style={{width:"150px"}}
                  InputProps={{ inputProps: { max: 2020 } }}
                  id="outlined-number"
                  label="Release"
                  type="number"
                  name="release"
                  onChange={handleChange} value={input.release}
                  variant="outlined"
                />
                   <TextField style={{width:"150px"}}
                  InputProps={{ inputProps: { min: 0, max: 1 } }}
                  id="outlined-number"
                  label="SinglePlayer"
                  type="number"
                  name="singleplayer"
                  onChange={handleChange} value={input.singlePlayer}
                  variant="outlined"
                />
                   <TextField style={{width:"150px"}}
                  InputProps={{ inputProps: { min: 0, max: 1 } }}
                  id="outlined-number"
                  label="MultiPlayer"
                  type="number"
                  name="multiplayer"
                  onChange={handleChange} value={input.multiplayer}
                  variant="outlined"
                />
             
          <br/>
          </div>
         
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Genre"
                  type="text" name="genre" onChange={handleChange} value={input.genre}
                  autoFocus
                />
              
                 <br/>
       
          <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Platform"
                  type="text" name="platform" onChange={handleChange} value={input.platform}
                  autoFocus
                />
        <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="ImageUrl"
                  type="text" name="image_url" onChange={handleChange} value={input.image_url}
                  autoFocus
                />
     
      
    
   
      <Button  color="primary" variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleSubmit}>
     Submit
      </Button>
      
      </form>
      </section>

      <div>
    
     
    </div>
    </>
  )
}

export default Games



