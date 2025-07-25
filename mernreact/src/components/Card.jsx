import React, { useEffect, useState,useRef } from "react"
import { usedispatchcart,usecart } from "./ContextReducer";
export default function Card(props) {
  let dispatch=usedispatchcart();
  let data=usecart();
  const priceref=useRef();
      let options=props.options;
      let priceopts = options ? Object.keys(options) : [];

     const [qty,setqty]= useState(1);
           const [size,setsize]=useState("");            
 let finalprice = qty * (parseInt(options[size]) || 0);
    const handleaddtocart=async ()=>{
      let food = data.find(
  (item) => item.id === props.fooditem._id && item.size === size
);
      if(food)
      {
          if(food.size===size)
          {
            await dispatch({type:"UPDATE",id:props.fooditem._id,price:finalprice,qty:qty, size: size})
            return
          }
          else if(food.size!==size)
                        await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qty:qty,size:size})
                      return

      }
           
            await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qty:qty,size:size})
            console.log(data);
    }
   
    useEffect(()=>{
      setsize(priceref.current.value);
    },[]);
   
  return (
    <div>  
      
 <div className="card mt-3" style={{"width": "18rem","maxHeight":"360px"}}>
  <img src={props.fooditem.img} className="card-img-top"
  alt="..."
  style={{ height: "150px", objectFit: "fill" }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/Veggie-Pizza-2-of-5-e1691215701129.webp";
  }} />
  <div className="card-body">
    <h5 className="card-title">{props.fooditem.name}</h5>
  
    <div  className='container w-100'>
        <select className="m-2 h-100  bg-success rounded " onChange={(e)=>{
        setqty(parseInt(e.target.value));

        }} >
            {Array.from(Array(6),(e,i)=>{
                return (
                    <option key={i+1} value={i+1}>{i+1}</option>
                )
            })}
        </select>
              <select className="m-2 h-100  bg-success rounded " ref={priceref} onChange={(e)=>{
                        setsize(e.target.value)
              }}>

               {
                priceopts.map((data)=>{
                  return (<option key={data} value={data}>{data}</option>)
                })
               }
              </select>
              <div className='d-inline h-100 fs-5'>
                <br />
               Total Price: {finalprice}/- 
              </div>
    </div>
    <hr />
       
       <button className={'btn btn-success justify-center ms-2'} onClick={handleaddtocart} >Add to Cart</button>
    
  </div>
</div>

    </div>
  )

}
