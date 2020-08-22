import React, {Component} from "react"
import axios from "axios"

function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id, 
        title: el.title, 
        rating: el.rating,
        duration: el.duration,
        genre: el.genre,
        description: el.description
      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <>
       
        <div id="article-list" style={{marginTop:"150px"}}>
        <h1 style={{fontSize:"100px"}}>Welcome</h1>
        </div>
      </>
    )
  }
}

export default Home