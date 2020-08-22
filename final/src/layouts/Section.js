import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "../pages/Login"
import Daftar from "../pages/Daftar"
import About from "../pages/About"
import Home from "../pages/Home"

import Movies from "../pages/Movies"
import MovieList from "../pages/MovieList"
import MovieForm from "../pages/MovieForm"
import MovieReview from "../pages/MovieReview"
import ChangePassword from "../pages/ChangePassword"
import {UserContext} from "../context/UserContext"

import GameList from "../pages/GameList"
import Games from "../pages/Games"
import GameForm from "../pages/GameForm"
import GameReview from "../pages/GameReview"

const Section = () =>{

  const [user, setUser,daftarUser, setDaftarUser] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {  
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;



  return(    
    <section >
      <Switch>
        <PrivateRoute exact path="/" user={user} component={Home}/>
        {/* <PrivateRoute exact path="/about" user={user} component={About}/> */}
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <LoginRoute exact path="/daftar" user={user} component={Daftar}/>


        <PrivateRoute exact path="/movielist" user={user} component={MovieList}/>
        <PrivateRoute exact path="/movie" user={user} component={Movies}/>
        <PrivateRoute exact path="/movie/create" user={user} component={MovieForm}/>
        <PrivateRoute exact path="/movie/edit/:id" user={user} component={MovieForm}/>
        <PrivateRoute exact path="/movie/review/:id" user={user} component={MovieReview}/>

        <PrivateRoute exact path="/gamelist" user={user} component={GameList}/>
        <PrivateRoute exact path="/game" user={user} component={Games}/>
        <PrivateRoute exact path="/game/create" user={user} component={GameForm}/>
        <PrivateRoute exact path="/game/edit/:id" user={user} component={GameForm}/>
        <PrivateRoute exact path="/game/review/:id" user={user} component={GameReview}/>

        <PrivateRoute exact path="/changepassword" user={user} component={ChangePassword}/>
        
      </Switch>
    </section>
  )
}

export default Section