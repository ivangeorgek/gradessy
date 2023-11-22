import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Topbar from "../../components/topbar/Topbar";
import SideMenu from "../../components/sideMenu/SideMenu";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/username/${username}`);
        setUser(res.data);
        console.log("Fetched user:", res.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    if (user && currentUser) {
      setIsConnected(user.connections.includes(currentUser._id));
    }
  }, [user, currentUser]);

  const handleConnect = async () => {
    // console.log("User:", user);
    // console.log("CurrentUser:", currentUser);
    if (!user || !currentUser) {
      console.error("User or currentUser is not set.");
      return;
    }
    try {
      const action = isConnected ? "disconnect" : "connect";
      const res = await axios.put(
        `http://localhost:8800/api/users/${user._id}/${action}`,
        { userId: currentUser._id }
      );
      if (res.status === 200) {
        alert(isConnected ? "Disconnected from user" : "Connected to user");
        setIsConnected(!isConnected);
      } else {
        alert(res.data);
      }
    } catch (error) {
      console.error("Error connecting to user", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profilePage">
      <Topbar />
      <div className="profilePageContent">
        <SideMenu />
        <div className="profileDetails">
          <h2>{user.username}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.isMentor ? "Mentor" : "Student"}</p>
          <p>Areas of Expertise: {user.areasOfExpertise}</p>
          <p>Bio: {user.bio}</p>
          <p>Company: {user.company}</p>
          <p>Title: {user.title}</p>
          {currentUser._id !== user._id && (
            <button className="profileConnectBtn" onClick={handleConnect} disabled={!user}>
              {isConnected ? "Disconnect" : "Connect"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;




