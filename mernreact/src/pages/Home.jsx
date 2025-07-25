import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {


           


const [search,setsearch]=useState('');

const [fooditem,setfooditem]=useState([]);
const [foodcat,setfoodcat]=useState([]);
const loaddata=async ()=>{
  let res=await fetch("http://localhost:4000/api/fooddata",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        }
  });

  res=await res.json();

  //console.log(res[0],res[1]);   
   setfooditem(res[0]);
   setfoodcat(res[1]);
 

  
   
}

useEffect(()=>{
      loaddata();

  },[]); 







  return (
    <>
        <div>
      <Navbar>
        </Navbar>
        </div>
           <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ObjectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"10"}}>
          <div className="d-flex justify-content-center" >
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
         setsearch(e.target.value);
      }}/>
      
    </div>
    </div>
    <div className="carousel-item active">
      <img src="gp4k2jro_burgers_625x300_20_June_22.jpg" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item ">
      <img src="AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d (1).jpg" className="d-block w-100" alt="..."/>
      
    </div>
    <div className="carousel-item ">
      <img src="1568222255998.jpg" className="d-block w-100" alt="..."/>
     
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        
        <div className='container'>
          {
            foodcat.length>0?foodcat.map((data)=>{
              return(
                <div className='row mb-3' key={data._id}>
              <div  className='fs-3 m-3 ' >
                {data.CategoryName}

                </div>
                <hr></hr>
                {
                  fooditem.length>0?fooditem.filter((item)=>item.CategoryName===data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map(filteritems=>{
                    return(
                      <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card fooditem={filteritems} options={filteritems.options[0]}
                      
                        ></Card>

                        </div>
                    )
                  })
                  
                  :<div>No Data</div>
                }
                </div>)
            }):<div>nothing</div>
          }
         
        </div>
        
        
        
        <Footer>

        </Footer>
      
    </>
  )
}
