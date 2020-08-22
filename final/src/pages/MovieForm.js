import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import "./Movies.css"

import { useHistory } from "react-router-dom";

import { MovieContext } from "../context/MovieContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {useParams} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
const Movies = () => {
  let history = useHistory();
  let { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const[dataMovies, setdataMovies,
         statusForm, setStatusForm,] =  useContext(MovieContext)
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
    if (statusForm === "edit" && movie===null){
      axios.get(`https://backendexample.sanbersy.com/api/movies/${id}`).then(res=>{
        
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
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "rating":
        {
          setInput({...input, rating: event.target.value});
            break
        }
        case "review":
          {
            setInput({...input, review: event.target.value});
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

    let title = input.title
    console.log(input)
   
    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/movies`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating),
          review: input.review,
          image_url: input.image_url,
        })
        .then(res => {
            setdataMovies([...dataMovies, {id: res.data.id, ...input}]) 
            history.push("/movie"); 
        })
       }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/movies/${id}`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating),
          review: input.review,
          image_url: input.image_url,
        })
        .then(res => {
            let singleMovie = dataMovies.find(el=> el.id === movie.id)
            singleMovie.title = input.title
            singleMovie.description = input.description
            singleMovie.year = input.year
            singleMovie.duration = input.duration
            singleMovie.genre = input.genre
            singleMovie.rating = input.rating
            singleMovie.review=input.review
            singleMovie.image_url=input.image_url
            setdataMovies([...dataMovies])
            history.push("/movie");  })
        
      }
      
      setStatusForm("create")
  
      setInput({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        review: "",
        image_url:""
      })
    }

  }


  return(
    <>
      {/* Form */}
      <h1>Movies Form</h1>
      <section>
      <form onSubmit={handleSubmit}>
        <div>
       
     
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            type="text" name="title" onChange={handleChange} value={input.title}
            autoFocus
          />
          {/* <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/> */}
          <br/>
      
        </div>
        <div>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Description"
            type="text" name="description" onChange={handleChange} value={input.description}
            autoFocus
       
          />
         
          <br/>
          <br/>
        </div>
        <div style={{display:"inline", float: "left"}}>
        <TextField style={{width:"150px",marginRight:"50px"}}
        InputProps={{ inputProps: { max: 2020 } }}
                  id="outlined-number"
                  label="Year"
                  type="number"
                  name="year"
                  onChange={handleChange} value={input.year}
                  variant="outlined"
                />
          <TextField style={{width:"150px",marginRight:"50px"}}
                  id="outlined-number"
                  label="Duration"
                  type="number"
                  name="duration"
                  onChange={handleChange} value={input.duration}
                  variant="outlined"
                />
                   <TextField style={{width:"150px"}}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  id="outlined-number"
                  label="Rating"
                  type="number"
                  name="rating"
                  onChange={handleChange} value={input.rating}
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
                  label="Review"
                  type="text" name="review" onChange={handleChange} value={input.review}
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

export default Movies