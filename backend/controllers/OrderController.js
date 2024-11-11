// controllers/orderController.js

const Order = require('../model/OrdersModel.js'); // Import your Order model

// Middleware to fetch orders for the logged-in user
const getUserOrders = async (req, res) => {
  try {
    const loggedInEmail = req.user.email; // Assuming the username is attached to req.user after authentication

    // Log the captured username
    console.log(`Fetching orders for user: ${loggedInEmail}`);

    // Fetch orders for the logged-in user only
    const orders = await Order.find(
      { username: loggedInEmail },
      { name: 1, qty: 1, price: 1, mode: 1 } // Select relevant fields, add mode if needed
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Middleware to delete an order for the logged-in user
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const loggedInUsername = req.user.username;

    // Log the captured username and the order being deleted
    console.log(`Request to delete order: ${orderId} by user: ${loggedInUsername}`);

    const order = await Order.findOne({ _id: orderId });

    // Ensure the order exists and belongs to the logged-in user
    if (!order || order.username !== loggedInUsername) {
      return res.status(403).json({ message: "You are not authorized to delete this order" });
    }

    await Order.deleteOne({ _id: orderId });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Middleware to create a new order for the logged-in user
const createOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const loggedInUsername = req.user.username;

    // Log the captured username when creating an order
    console.log(`Creating order for user: ${loggedInUsername}`);

    // Ensure order data is present
    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ message: "All order fields (name, qty, price, mode) are required" });
    }

    const newOrder = new Order({
      name,
      qty,
      price,
      mode,
      username: loggedInUsername, // Attach the logged-in user's username
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUserOrders,
  deleteOrder,
  createOrder,
};
