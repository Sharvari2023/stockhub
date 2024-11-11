// Import necessary modules and styles
import React from "react";
import './Team.css';
// Uncomment these lines if you want to use image imports instead of path strings
// import dishaImage from 'media/images/disha.jpeg';
// import sharvariImage from 'media/images/sharvari.jpeg';
// import palakImage from 'media/images/palak.jpeg';
// import shivaniImage from 'media/images/shivani.jpeg';

// Functional component representing an individual team member
function TeamMember({ name, branch, imageSrc, links }) {
  return (
    <div className="team-member"> {/* Container for each team member */}
      <img src={imageSrc} alt={name} /> {/* Display member's image */}
      <h4>{name}</h4> {/* Display member's name */}
      <h6>{branch}</h6> {/* Display member's branch */}
      <p>
        {/* Map through the links array and create a list of links */}
        {links.map((link, index) => (
          <span key={index}> {/* Unique key for each link */}
            <a href={link.href} target="_blank" rel="noopener noreferrer"> {/* Open link in a new tab */}
              {link.label} {/* Display link label */}
            </a>
            {index < links.length - 1 && " / "} {/* Add separator if not the last link */}
          </span>
        ))}
      </p>
    </div>
  );
}

// Functional component representing the team section
function Team() {
  // Array of team member objects
  const teamMembers = [
    {
      name: "Disha Jain",
      branch: "Electrical",
      // imageSrc: dishaImage, // Uncomment to use imported images
      imageSrc: "media/images/disha.jpeg", // Path to member's image
      links: [ // Array of links for the member
        { label: "github", href: "https://github.com/dishajain260" },
        { label: "linkedin", href: "https://www.linkedin.com/in/dishajain1804/" },
      ],
    },
  
    {
      name: "Palak Jain",
      branch: "Mechanical",
      // imageSrc: palakImage, // Uncomment to use imported images
      imageSrc: "media/images/palak.jpeg", // Path to member's image
      links: [
        { label: "github", href: "https://github.com/Pjdash" },
        { label: "linkedin", href: "https://www.linkedin.com/in/palak-jain-3bbb4b288/" },
      ],
    },
  ];

  return (
    <div className="team-section"> {/* Container for the entire team section */}
      <div className="team-header">
        <h1>Our Team</h1> {/* Section header */}
      </div>
      <div className="team-members"> {/* Container for team members */}
        {/* Map through the teamMembers array and render a TeamMember for each */}
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index} // Unique key for each team member
            name={member.name} // Pass member's name
            branch={member.branch} // Pass member's branch
            imageSrc={member.imageSrc} // Pass member's image source
            links={member.links} // Pass member's links
          />
        ))}
      </div>
    </div>
  );
}

export default Team; // Export the Team component for use in other parts of the application
