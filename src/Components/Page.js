import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Page() {
   const [name,setName] = useState()
   const [email,setEmail] = useState()
   const navigate = useNavigate()

    useEffect( () => {
        fetch("https://password-reset-rmb9.onrender.com/userdata", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token")
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            setName(result.data.username)
            setEmail(result.data.email)
          });
    },[])

    function handleLogout(){
        window.localStorage.clear()
        navigate('/login')
    }

  return (
    <div>
        <div className='container mt'>
            <div className='container-fluid'>
                <div className='card border-dark' style={{width: "20rem"}}>
                    <div className='card-header'>
                        <p><b>Registered User</b></p>
                    </div>
                    <div className='card-body'>
                        <p><b>USERNAME:</b><strong>{name}</strong></p>
                        <p><b>Email:</b><strong>{email}</strong></p>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </div>
                </div> 
            </div>
        </div>  
    </div>
  )
}
