import React from "react"; // Import React for building the component
import { Link } from "react-router-dom"; // Import Link for navigation between routes
import './Funds.css'; // Import CSS for styling the Funds component

// Define the Funds component
const Funds = () => {
  return (
    <>
      <div className="funds"> {/* Main container for the funds overview */}
        <div className="funds-container"> {/* Container for funds-related elements */}
          <h1 className="titlex">Funds Overview</h1> {/* Title of the section */}
          <div className="row"> {/* Flexbox row for layout */}
            <div className="col"> {/* Column for fund actions */}
              <p>Your Funds</p> {/* Text label for the funds section */}
              {/* Link to add funds; navigates to /add-fund route */}
              <Link to="/add-fund" className="btn">Add Fund</Link> 
              {/* Link to withdraw funds; navigates to /withdraw-fund route */}
              <Link to="/withdraw-fund" className="btn">Withdraw Fund</Link>
            </div>
            <div className="col"> {/* Second column for additional fund info */}
              {/* Add more fund-related info here if needed */}
            </div>
          </div>
          <div className="table"> {/* Container for the fund details table */}
            <div className="data"> {/* Header for the fund details */}
              <p>Fund Name</p> {/* Column header for fund names */}
              <p>Amount</p> {/* Column header for fund amounts */}
            </div>
            <hr /> {/* Divider line */}
            {/* Example of a fund entry; repeat for each fund */}
            <div className="data">
              <p>Sample Fund</p> {/* Name of the sample fund */}
              <p>$1,000</p> {/* Amount for the sample fund */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds; // Export the Funds component for use in other parts of the application
