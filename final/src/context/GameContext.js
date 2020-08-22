import React, { useState, createContext,useEffect  } from "react";
import axios from 'axios';
export const GameContext = createContext();

export const GameProvider = props => {
  
  const [dataGames, setdataGames] =  useState([])
  const [ statusForm, setStatusForm] =  useState("create")

 
  useEffect(() => {
    if (dataGames.length === 0 ) {
      axios.get(`https://backendexample.sanbersy.com/api/games`)
        .then(res => {
       
          const newData = res.data.map((el) => { return el}) ;

          setdataGames(newData);
        
        })
    }
  })

  
  return (
    <GameContext.Provider value={[dataGames, setdataGames,
                                   statusForm, setStatusForm]}>
      {props.children}

    </GameContext.Provider>
  );
};