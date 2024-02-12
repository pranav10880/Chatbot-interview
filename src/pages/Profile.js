import React, { useState } from "react";
import axios from "axios";
import "./Profile.css"; // Import the CSS file for styling

const ProfileCreation = () => {
  // State variables for profile fields
  const [overview, setOverview] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [locations, setLocations] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an HTTP POST request to the backend server
      await axios.post("http://localhost:5000/api/profiles", {
        overview,
        phone,
        industry,
        companySize,
        specialties,
        locations
      });
      console.log("Profile data submitted successfully");
      // You can add further logic here, such as displaying a success message to the user
    } catch (error) {
      console.error("Error submitting profile data:", error);
      // You can handle errors here, such as displaying an error message to the user
    }
  };

  return (
    <div className="profile-creation-container">
      <h1>Profile Creation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="overview">Overview:</label>
          <textarea
            id="overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Enter company overview"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Enter industry"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companySize">Company Size:</label>
          <input
            type="text"
            id="companySize"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            placeholder="Enter company size"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialties">Specialties:</label>
          <input
            type="text"
            id="specialties"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
            placeholder="Enter specialties"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="locations">Locations:</label>
          <input
            type="text"
            id="locations"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter locations"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileCreation;
