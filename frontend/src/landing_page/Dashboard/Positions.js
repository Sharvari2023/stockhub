import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
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
          if (userdata.user?.email) {
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
  }, [token]);

  useEffect(() => {
    axios.get("http://localhost:3003/allOrders").then((res) => {
      setAllOrders(res.data);
    });
  }, []);

  const getLastTradePrice = (stockName) => {
    switch (stockName) {
      case "GOOGL":
        return 178.36;
      case "AAPL":
        return 226.77;
      case "MSFT":
        return 422.68;
      default:
        return 0; // Return 0 for unknown stocks
    }
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
        Stakes
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
              <th style={{ fontWeight: "500" }}>Product</th>
              <th style={{ fontWeight: "500" }}>Ticker</th>
              <th style={{ fontWeight: "500" }}>Shares</th>
              <th style={{ fontWeight: "500" }}>Avg. Cost Price</th>
              <th style={{ fontWeight: "500" }}>Last Trade Price</th>
              <th style={{ fontWeight: "500" }}>P&L</th>
              <th style={{ fontWeight: "500" }}>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((stock, index) => {
              if (userEmail === stock.username) {
                const curValue = stock.price * stock.qty;
                const lastTradePrice = getLastTradePrice(stock.name);
                const pnlValue = curValue - lastTradePrice * stock.qty;
                const dayChange =
                  ((stock.price - lastTradePrice) / stock.price) * 100;

                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "#2a2a2a" : "#1a1a1a",
                    }}
                  >
                    <td>{stock.product || "CNC"}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{lastTradePrice}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td
                      style={{
                        color: pnlValue < 0 ? "#ff3d00" : "#00e676",
                        fontWeight: "500",
                      }}
                    >
                      {pnlValue.toFixed(2)}
                    </td>
                    <td
                      style={{
                        color: dayChange < 0 ? "#ff3d00" : "#00e676",
                        fontWeight: "500",
                      }}
                    >
                      {dayChange.toFixed(2)}%
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
