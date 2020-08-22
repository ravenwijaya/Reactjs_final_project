import React, { useState, createContext,useEffect  } from "react";
import axios from 'axios';
export const UserContext = createContext();

export const UserProvider = props => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const iniateUser = currentUser ? currentUser : null

  const [user, setUser] = useState(iniateUser);
  const [daftarUser, setDaftarUser] =  useState([])
 
  useEffect( () => {

    if (daftarUser.length === 0){
      axios.get(`https://backendexample.sanbersy.com/api/users`)
      .then(res => {
  
          setDaftarUser(res.data.map(el=>{ return {
            id: el.id, 
            username: el.username, 
            password: el.password,
            created_at:el.created_at, 
            updated_at:el.updated_at
          }
        }))
      })
    }
  }, [daftarUser])

  
  return (
    <UserContext.Provider value={[user,setUser,daftarUser, setDaftarUser]}>
      {props.children}
    </UserContext.Provider>
  );
};