import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("userData")) || {};
  const [userEmail, setUserEmail] = useState(userdata.email || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ensure token retrieval
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch('/Orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((userdata) => {
          if (userdata.user.email) {
            setUserEmail(userdata.user.email); // Update with the actual email if available
            localStorage.setItem("userData", JSON.stringify(userdata));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3003/allOrders").then((res) => {
      // console.log(res.data);
      setAllOrders(res.data);
    });
  }, []);

  const labels = allOrders.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allOrders.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)", // You can adjust this if needed
      },
    ],
  };

  return (
    

    <>
      <h3
        style={{
          fontFamily: "Roboto, sans-serif",
          color: "black",
          margin: "20px 0",
          fontWeight: "600",
        }}
      >
        Orders 
      </h3>

      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          marginBottom: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            color: "#e0e0e0",
            borderCollapse: "collapse",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#333", color: "#e0e0e0" }}>
              <th style={{ fontWeight: "500" }}>Name</th>
              <th style={{ fontWeight: "500" }}>Quantity</th>
              <th style={{ fontWeight: "500" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((stock, index) => {
              // Check if the userEmail matches the stock's username
              if (userEmail === stock.username) {
                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#1a1a1a",
                    }}
                  >
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>₹{stock.price}</td>
                  </tr>
                );
              } else {
                return null; // If the user is not the owner, don't render the row
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
