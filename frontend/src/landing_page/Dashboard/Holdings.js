import React, { useState, useEffect } from "react";
import axios from "axios";
import { DoughnutChart}  from "./VerticalGraph";

const Holdings = () => {
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
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Adjust as needed
      },
    ],
  };

  // Helper function to convert percentage string to a number
  const parsePercentage = (percentStr) => {
    if (typeof percentStr === "string") {
      const parsed = parseFloat(percentStr.replace('%', '').trim());
      return isNaN(parsed) ? 0 : parsed; // Return 0 if parsing fails
    }
    return percentStr; // Return as is if already a number
  };

  // Function to get the last trade price based on stock name
  const getLastTradePrice = (stockName) => {
    switch (stockName) {
      case "GOOGL":
        return 178.36;
      case "AAPL":
        return 226.77;
      case "MSFT":
        return 422.68;
        case "AMZN":
            return 208.16;
        
      default:
        return 0; // Return 0 for unknown stocks
    }
  };

  return (
    <>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', color: "black", margin: '20px 0', fontWeight: '600' }}>
        Assets
      </h3>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)', marginBottom: '20px' }}>
        <table style={{ width: '100%', color: '#e0e0e0', borderCollapse: 'collapse', fontFamily: 'Roboto, sans-serif' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#e0e0e0' }}>
              <th style={{ fontWeight: '500' }}>Ticker</th>
              <th style={{ fontWeight: '500' }}>Shares</th>
              <th style={{ fontWeight: '500' }}>Avg. Cost Price</th>
              <th style={{ fontWeight: '500' }}>Last Trade Price</th>
              <th style={{ fontWeight: '500' }}>Cur. Val</th>
              <th style={{ fontWeight: '500' }}>P&L</th>
              <th style={{ fontWeight: '500' }}>Net Chg.</th>
              <th style={{ fontWeight: '500' }}>Day Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((stock, index) => {
              if (userEmail === stock.username) {
                const curValue = stock.price * stock.qty;
                // Get the last trade price based on the stock name
                const lastTradePrice = getLastTradePrice(stock.name);
                const pnlValue = curValue - lastTradePrice * stock.qty; // Calculate P&L value
                // Net change percentage
                const netChange = ((stock.price - lastTradePrice) / lastTradePrice) * 100;

                // Day change (you can adjust this logic based on actual data)
                const dayChange = ((stock.price - lastTradePrice) / stock.price) * 100;

                return (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#2a2a2a' : '#1a1a1a' }}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{lastTradePrice}</td>
                    <td>{stock.price}</td>
                    <td>{curValue}</td>
                    <td style={{ color: pnlValue < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                      {pnlValue.toFixed(2)}
                    </td>
                    <td style={{ color: netChange < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                      {netChange.toFixed(2)}% {/* Display Net Change Percentage */}
                    </td>
                    <td style={{ color: dayChange < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                      {dayChange.toFixed(2)}% {/* Display Day Change */}
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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '8px', flex: '1', margin: '0 10px' }}>
          <h5 style={{ color: "black", fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>Total Investment</h5>
          <p style={{ color: "grey", fontSize: '1.5rem', fontWeight: '600' }}>29,875.<span>55</span></p>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '8px', flex: '1', margin: '0 10px' }}>
          <h5 style={{ color: "black", fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>Current Value</h5>
          <p style={{ color: "grey", fontSize: '1.5rem', fontWeight: '600' }}>31,428.<span>95</span></p>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '8px', flex: '1', margin: '0 10px' }}>
          <h5 style={{ color: "black", fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>P&L</h5>
          <p style={{ color: "grey", fontSize: '1.5rem', fontWeight: '600' }}>1,553.40 (+5.20%)</p>
        </div>
      </div>

      {/* <DoughnutChart data={data} /> */}
    </>
  );
};

export default Holdings;
