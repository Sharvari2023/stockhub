// import React from 'react'
// import { Route, Routes } from "react-router-dom";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import { GeneralContextProvider } from "./GeneralContext";

// export default function Dashboard() {
//   return (
// <div className="dashboard-container">
// <GeneralContextProvider>
//         <WatchList />
//       </GeneralContextProvider>
     
//       <div className="content">
//         <Routes>
//           <Route exact path="/" element={<Summary />} />
//         </Routes>
//       </div>
//     </div>
//   )
// }
import React from "react";
import { Route, Routes } from "react-router-dom";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route index element={<Summary />} />  {/* This matches "/dashboard" */}
          <Route path="orders" element={<Orders />} />  {/* Matches "/dashboard/orders" */}
          <Route path="holdings" element={<Holdings />} />  {/* Matches "/dashboard/holdings" */}
          <Route path="positions" element={<Positions />} />  {/* Matches "/dashboard/positions" */}
          <Route path="funds" element={<Funds />} />  {/* Matches "/dashboard/funds" */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
