import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { api } from '../lib/api';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await api.post("/myorderdata", {
        email: localStorage.getItem("useremail")
      });

      const json = res.data;
      console.log(json);

      if (json.success) {
        setOrderData(json.order_data || []);
      } else {
        alert("Failed to fetch orders: " + json.error);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Something went wrong while fetching your orders.");
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.slice(0).reverse().map((orderGroup, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {orderGroup.length > 0 && orderGroup[0].Order_date && (
                  <div className="m-auto mt-5 text-center">
                    <strong>{orderGroup[0].Order_date}</strong>
                    <hr />
                  </div>
                )}
                {orderGroup.slice(1).map((item, itemIndex) => (
                  <div key={itemIndex} className="col-12 col-md-6 col-lg-3">
                    <div className="card mt-3" style={{ width: "16rem" }}>
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="container w-100 p-0">
                          <span className="m-1">Qty: {item.qty}</span>
                          <span className="m-1">Size: {item.size}</span>
                          <div className="d-block mt-2 fs-5">
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <p className="text-center mt-5">No orders found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
