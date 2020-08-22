
import { BrowserRouter as Router } from "react-router-dom";
import React, { useContext } from "react"
import Header from "./Header"
import Section from "./Section"
import Footer from "./Footer"
import { MovieProvider } from "../context/MovieContext";
import { GameProvider } from "../context/GameContext";
import { UserContext } from "../context/UserContext";

const Main = () =>{
  const [user, setUser,
    daftarUser, setDaftarUser] = useContext(UserContext)
  return(
    <>
      <Router>        
        { user && <Header/>  }
        <MovieProvider>   
        <GameProvider>   
           <Section/>
        </GameProvider>
        </MovieProvider>
    
        <Footer/>
      </Router>
    </>
  )
}

export default Main