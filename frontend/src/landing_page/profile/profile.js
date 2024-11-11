import React, { useState, useRef, useEffect } from "react";
import './profile.css'; // Import CSS styles for the profile page
import Navbar from '../Navbar'; // Import Navbar component
import Footer from "../Footer"; // Import Footer component

function ProfilePage() {
  const [description, setDescription] = useState("");
  const [submittedDescription, setSubmittedDescription] = useState("");
  const [interests, setInterests] = useState("");
  const [submittedInterests, setSubmittedInterests] = useState("");
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "", linkedin: "" });
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const fileInputRef = useRef(null);

  const userdata = JSON.parse(localStorage.getItem("userData")) || {};
  const [userName, setUserName] = useState(userdata.username || "");
  const [userEmail, setUserEmail] = useState(userdata.email || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch('/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((userdata) => {
          if (userdata.user.username && userdata.user.email) {
            setUserName(userdata.user.username);
            setUserEmail(userdata.user.email);
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

  const handleDocumentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDocument = { name: file.name, file };
      setUploadedDocuments([...uploadedDocuments, newDocument]);
    }
  };

  const handleViewDocument = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div className="header">
          <div className="profile-picture">
            <img
              src="https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg?w=768"
              alt="Icon"
              className="icon"
            />
          </div>
          <div className="profile-info">
            <h2>Name: {userName}</h2>
            <p>Email: {userEmail}</p>
          </div>
        </div>

        <div className="content">
          {/* Description Section */}
          <div className="description-section">
            <h3>Description</h3>
            <form onSubmit={(e) => { e.preventDefault(); setSubmittedDescription(description); setDescription(""); }}>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write about yourself..."
                className="description-textarea"
                rows="4"
                required
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <div className="submitted-description">
              <h4>Your Description:</h4>
              <p>{submittedDescription}</p>
            </div>
          </div>

          {/* Interested In Section */}
          <div className="interests-section">
            <h3>Interested In</h3>
            <form onSubmit={(e) => { e.preventDefault(); setSubmittedInterests(interests); setInterests(""); }}>
              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Write your interests here..."
                className="interests-textarea"
                rows="3"
                required
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <div className="submitted-interests">
              <h4>Your Interests:</h4>
              <p>{submittedInterests}</p>
            </div>
          </div>

          {/* Upload Document Section */}
          <div className="documents-section">
            <h3>Upload and View Documents</h3>
            <button onClick={handleDocumentClick} className="btn btn-primary">Upload Document</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <ul className="document-list">
              {uploadedDocuments.map((doc, index) => (
                <li key={index} onClick={() => handleViewDocument(doc.file)} className="document-item">
                  {doc.name}
                </li>
              ))}
            </ul>
            {uploadedDocuments.length === 0 && <p>No documents uploaded yet.</p>}
          </div>

          {/* Contact Information Section */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="Email"
                className="contact-input"
                required
              />
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="Phone"
                className="contact-input"
                required
              />
              <input
                type="text"
                value={contactInfo.linkedin}
                onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
                placeholder="LinkedIn URL"
                className="contact-input"
                required
              />
              <button type="submit" className="btn btn-primary">
                Save Contact Info
              </button>
            </form>
            <div className="saved-contact-info">
              <h3>Your Contact Information:</h3>
              <p>Email: {contactInfo.email || "Not provided"}</p>
              <p>Phone: {contactInfo.phone || "Not provided"}</p>
              <p>LinkedIn: {contactInfo.linkedin || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
