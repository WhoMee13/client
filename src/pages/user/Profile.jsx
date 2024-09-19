// Profile.jsx

import React from "react";
import "../../css/Profile.scss";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Profile = () => {
  const {value,_} = useAuth()

    return (
      <>
      <Navbar></Navbar>
      <div className="profile-container">
        <div className="profile-card">
          <h1>My Profile</h1>
          <div className="profile-card__content">
            <h3 className="profile-card__name_small">@{value.username}</h3>
            <span>Email: {value.email}</span>
            <span>Contact No.{value.contact}</span>
            <span>Address: {value.address}</span>
          </div>
        </div>
      </div>
      <Footer></Footer>
      </>
    );
  }


export default Profile;
