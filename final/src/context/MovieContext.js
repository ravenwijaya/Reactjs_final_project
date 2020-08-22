import React, { useState, createContext,useEffect  } from "react";
import axios from 'axios';
export const MovieContext = createContext();

export const MovieProvider = props => {
  
  const [dataMovies, setdataMovies] =  useState([])
  const [ statusForm, setStatusForm] =  useState("create")

 
  useEffect(() => {
    if (dataMovies.length === 0 ) {
      axios.get(`https://backendexample.sanbersy.com/api/movies`)
        .then(res => {
       
          const newData = res.data.map((el) => { return el}) ;

          setdataMovies(newData);
        
        })
    }
  })

  
  return (
    <MovieContext.Provider value={[dataMovies, setdataMovies,
                                   statusForm, setStatusForm]}>
      {props.children}

    </MovieContext.Provider>
  );
};