import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from './Cart';
import { usecart } from './ContextReducer';

export default function Navbar(){
  let data=usecart();
  const [cartview,setcartview]=useState(false);

  const navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem("authtoken");
    navigate("/login")

  }
  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
  
    <img  src="c47964b8a82be22fedadb42e05ac335e.png" alt=""   style={{ height: "80px", objectFit: "cover" }}/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav me-auto mb-2 ">
        <li className='nav-item'>
        <Link className="nav-link fs-5 active ml-5" aria-current="page" to="/">Home</Link>
       </li>
       { (localStorage.getItem("authtoken"))?
          
               <li className='nav-item'>
        <Link className="nav-link fs-5 active ml-5" aria-current="page" to="/myorderdata">My Orders </Link>
       </li>
       :""}
      </ul>
     { (!localStorage.getItem("authtoken"))?
        <div className='d-flex'>
     <Link className="nav-link bg-white text-success mx-1" to="/login">Login</Link>
        <Link className="nav-link bg-white text-success mx-1 " to="/createuser">Sign up</Link>
       </div>
       :
          <div>
            <div className='btn bg-white text-success mx-2' onClick={()=>{
              setcartview(true);
            }}>
            My Cart {" "}

   <Badge pill bg="danger">{data.length}</Badge>

            </div>
         {cartview?<Modal onClose={()=>setcartview(false)}
         > 
          <Cart/></Modal>:null}
           <div className='btn bg-white text-danger mx-2 ' onClick={handlelogout}>
            LogOut


            </div>

            </div>
       }

     
    </div>
  
  </div>
</nav>
    </div>
  )
}
