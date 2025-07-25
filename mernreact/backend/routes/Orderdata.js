import express from 'express';
import Order from '../models/Orders.js'; // make sure this is correct
export const route3 = express.Router();

route3.post('/orderData', async (req, res) => {
  try {
    let data = req.body.order_data;
    const email = req.body.email;
    const orderDate = req.body.order_date;

    if (!data || !email) {
      return res.status(400).json({ success: false, error: "Missing order data or email" });
    }

    // Add order date to beginning of data
    data.splice(0, 0, { Order_date: orderDate });

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [data]
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });

  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});
route3.post('/myorderdata', async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const orderData = await Order.findOne({ email });

    if (!orderData) {
      return res.status(404).json({ success: false, error: "No orders found" });
    }

    res.status(200).json({ success: true, order_data: orderData.order_data });

  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ success: false, error: error.message }); // ✅ RETURN JSON
  }
});