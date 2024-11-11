import React from "react";
import { FaWallet, FaInfoCircle } from "react-icons/fa";
import ProgressRing from "./ProgressRing"; // Ensure ProgressRing is styled as suggested
import "./Summary.css";

const Summary = () => {
  return (
    <>  
     <div className="username">
        <h6>Current Equity Position: Track Your Growth!</h6>
        <hr className="divider" />
      </div>
      <div className="summary-container">
        <div className="header">
          <h6>EQUITY <FaInfoCircle className="info-icon" title="Track Your Growth!" /></h6>
        </div>

        <div className="equity-section">
          <div className="progress-ring">
            <ProgressRing percentage={30} /> {/* Example percentage */}
          </div>
          <div className="equity-data">
            <h3 className="value">3.74k</h3>
            <p className="label">Accessible Margin</p>
            <p className="subtext">Used Leverage <span>0</span></p>
            <p className="subtext">Starting Capital <span>3.74k</span></p>
          </div>
        </div>

        <div className="assets-section">
          <h5>Assets Held (13)</h5>
          <div className="asset-stats">
            <div className="data-item">
              <h3 className="value green">
                1.55k <small>+5.20%</small>
              </h3>
              <p className="label">Net Gain/Loss</p>
            </div>
            <div className="data-item">
              <h4 className="sub-value">31.43k</h4>
              <p className="label">Market Value</p>
            </div>
            <div className="data-item">
              <h4 className="sub-value">29.88k</h4>
              <p className="label">Invested Capital</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
