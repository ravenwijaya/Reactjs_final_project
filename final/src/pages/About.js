import React from "react"

const About = () =>{
  return (
    <div style={{padding: "10px", border: "1px solid #ccc"}}>
      <h1 style={{textAlign: "center"}}>Data Peserta Sanbercode Bootcamp Reactjs</h1>
      <ol>
        <li><strong style={{width: "100px"}}>Nama:</strong> nama peserta</li> 
        <li><strong style={{width: "100px"}}>Email:</strong> email pesera</li> 
        <li><strong style={{width: "100px"}}>Sistem Operasi yang digunakan:</strong> sistem operasi peserta</li>
        <li><strong style={{width: "100px"}}>Akun Gitlab:</strong> akun gitlab peserta</li> 
        <li><strong style={{width: "100px"}}>Akun Telegram:</strong> akun telegram peserta</li> 
      </ol>
    </div>
  )
}

export default About