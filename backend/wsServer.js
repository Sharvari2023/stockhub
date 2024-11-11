const WebSocket = require('ws');
const dotenv = require('dotenv');
const fetch = require('node-fetch');  // Use node-fetch to make HTTP requests
dotenv.config();

// Validate environment variables
if (!process.env.FINNHUB_API_KEY || !process.env.WEBSOCKET_PORT) {
  console.error('Error: Missing required environment variables.');
  process.exit(1);
}

// Initialize WebSocket Server
const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT || 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Function to fetch stock data from Finnhub
  const fetchStockData = async (symbol) => {
    const apiKey = process.env.FINNHUB_API_KEY; // Your Finnhub API Key from .env
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching stock data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return null;
    }
  };

  // Send stock data to the client periodically
  const intervalId = setInterval(async () => {
    try {
      // Fetch data for multiple stocks from Finnhub
      const stocks = ['AAPL', 'GOOGL', 'MSFT',]; // Add more symbols as needed
      const stockDataPromises = stocks.map((symbol) => fetchStockData(symbol));
      const stockData = await Promise.all(stockDataPromises);

      // Format and send stock data
      const formattedData = stockData.map((data, index) => {
        if (data) {
          // Calculate percentage change
          const percentChange = ((data.c - data.pc) / data.pc * 100).toFixed(2);
          // Determine if the stock is down
          const isDown = data.c < data.pc;

          console.log(`Sending data for ${stocks[index]}:`, {
            name: stocks[index], // Stock symbol
            price: data.c, // Current price
            percent: `${percentChange}%`, // Price change percentage
            isDown: isDown, // Whether the stock is down
          });

          return {
            name: stocks[index], // Stock symbol
            price: data.c, // Current price
            percent: `${percentChange}%`, // Price change percentage
            isDown: isDown, // Whether the stock is down
          };
        }
        return null;
      }).filter(data => data !== null);  // Filter out any null data from failed requests

      // Send to the client
      ws.send(JSON.stringify(formattedData));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      ws.send(JSON.stringify({ error: 'Error fetching stock data' }));
    }
  }, 3000); // Send every 3 seconds

  // Clean up the interval when the client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

console.log(`WebSocket server running on port ${process.env.WEBSOCKET_PORT || 8080}`);
