import React, { useState } from "react"; // Import React and useState hook
import { Link } from "react-router-dom"; // Import Link for routing between components
// Define the Menu component
const Menu = () => {
  // State to track the currently selected menu item
  const [selectedMenu, setSelectedMenu] = useState(0);
  // State to manage the profile dropdown visibility
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Function to handle clicks on menu items
  const handleMenuClick = (index) => {
    setSelectedMenu(index); // Update the selected menu index
  };

  // Function to toggle the profile dropdown
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen); // Toggle the dropdown state
  };

  // Define CSS class names for the menu items
  const menuClass = "menu"; // Default menu class
  const activeMenuClass = "menu selected"; // Class for active (selected) menu item

  return (
    <div className="menu-container"> {/* Main container for the menu */}
    
      <div className="menus"> {/* Container for the menu items */}
        <ul>
          {/* Each menu item is a list item with a Link */}
          <li>
            <Link
              style={{ textDecoration: "none" }} // Remove default link styling
              to="/" // Navigate to home on click
              onClick={() => handleMenuClick(0)} // Update selected menu index
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/orders" // Navigate to orders
              onClick={() => handleMenuClick(1)} // Update selected menu index
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/holdings" // Navigate to holdings
              onClick={() => handleMenuClick(2)} // Update selected menu index
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Assets
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/positions" // Navigate to positions
              onClick={() => handleMenuClick(3)} // Update selected menu index
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Stakes
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/funds" // Navigate to funds
              onClick={() => handleMenuClick(4)} // Update selected menu index
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          {/* 
          Uncomment this section to enable the Apps menu item
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/apps" // Navigate to apps
              onClick={() => handleMenuClick(6)} // Update selected menu index
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li> 
          */}
        </ul>
       
      </div>
    </div>
  );
};

export default Menu; 