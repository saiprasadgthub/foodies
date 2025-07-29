import React from 'react'
import { usecart, usedispatchcart } from './ContextReducer'
import { api } from '../lib/api'
import Delete from '@mui/icons-material/Delete'

export default function Cart() {
  let data = usecart();
  let dispatch = usedispatchcart();
  console.log("Cart data:", data);

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{ backgroundColor: "white", color: "black", border: "0.8px solid white" }}>
          Your Cart is Empty!
        </div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let useremail = localStorage.getItem("useremail");
    if (!useremail) {
      alert("You're not logged in. Please login first.");
      return;
    }

    const orderPayload = {
      order_data: [
        [
          { Order_date: new Date().toDateString() },
          ...data
        ]
      ],
      email: useremail
    };

    console.log("Sending order payload:", orderPayload);

    let res = await fetch(api.Orderdata, { // ✅ Using dynamic API route
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    console.log("order response", res);

    if (res.status === 200) {
      dispatch({ type: "DROP" });
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover text-white'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food._id || index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.qty * food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => dispatch({ type: "REMOVE", index })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*<div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>*/}
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  )
}
