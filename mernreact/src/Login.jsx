import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  let navigate=useNavigate();
  const [cred,setcred]=useState({email:"",password:""}) 
   const handlesubmit=async (e)=>{
        e.preventDefault();
          const response=await fetch("http://localhost:4000/api/loginuser",{
             method:'POST',
             headers:{
              'Content-Type':'application/json'

             },
             body:JSON.stringify({email:cred.email,password:cred.password})
          });
          const json=await response.json()

          console.log(json.user);
            if(json.success)
               {                localStorage.setItem("useremail",cred.email);
                localStorage.setItem("authtoken",json.authToken) ;
                  console.log("useremail saved:", localStorage.getItem("useremail"));
  console.log("authtoken saved:", localStorage.getItem("authtoken"));
                console.log(localStorage.getItem("authtoken"));
            navigate("/");

                 
           }
           if(!json.success)
           { 
                 alert(`Error: ${json.error || json.errors || "Enter valid credentials"}`);
                 console.log(json);
           }
        
      };
      const onchange=(e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
      }
  return (
    <div>
       <div>
     
      <form onSubmit={
        handlesubmit
      }>
        
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"  name='email' value={cred.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={cred.password} onChange={onchange} id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className='m-3 btn '>New to GoFood </Link>
</form>
    </div>
         
    </div>
  )
}
