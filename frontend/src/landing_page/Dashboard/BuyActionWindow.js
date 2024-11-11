import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockData, setStockData] = useState([]); // Holds all stock data
  const [stockQuantity, setStockQuantity] = useState(1); // For quantity input
  const [stockPrice, setStockPrice] = useState(0.0); // Initialize unit price

  const userdata = JSON.parse(localStorage.getItem("userData")) || {};
  const [userEmail, setUserEmail] = useState(userdata.email || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ensure token retrieval
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch('/newOrder', {
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
    const ws = new WebSocket(`ws://localhost:${process.env.REACT_APP_WEBSOCKET_PORT || 8080}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStockData(data); // Update stock data from WebSocket
      const stock = data.find((s) => s.name === uid);
      if (stock) {
        setStockPrice(stock.price); // Update current stock price
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [uid]);

  const handleBuyClick = () => {
  // Calculate total price
    console.log(`Username: ${userEmail}`); // Log username for debugging

    console.log(`Placing buy order for ${uid} at ₹${stockPrice}`);

    axios
      .post("http://localhost:3003/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice, // Save unit price
        username: userEmail, // Save username
        mode: "BUY",
      })
      .then(() => {
        GeneralContext.closeBuyWindow();
      })
      .catch((error) => {
        console.error("Error placing buy order:", error);
      });
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              value={stockPrice.toFixed(2)}
              readOnly
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
