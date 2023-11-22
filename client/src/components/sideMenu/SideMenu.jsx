import { Link } from "react-router-dom";
import "./sideMenu.css";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import { AuthContext, logoutCall } from "../../context/AuthContext"; // Import the logoutCall function


function SideMenu() {
  // Get the dispatch function from the AuthContext
  const { dispatch } = useContext(AuthContext);
  // Define the logout function
  const handleLogout = () => {
    logoutCall(dispatch);
  };

  return (
    <div className="sideMenu">
      <div className="sideMenuWrapper">
        <ul className="sideMenuList">
          <li className="sideMenuListItem">
            <Link to="/" className="sideMenuLink">
              <HomeIcon className="sideMenuIcon" />
              <span className="sideMenuListItemText">Home</span>
            </Link>
          </li>
        </ul>

        <ul className="sideMenuList">
          <li className="sideMenuListItem">
            <Link to="/tasks" className="sideMenuLink">
              <AssignmentTurnedInIcon className="sideMenuIcon" />
              <span className="sideMenuListItemText">Tasks</span>
            </Link>
          </li>
        </ul>

        <ul className="sideMenuList">
          <li className="sideMenuListItem">
            <Link to="/chats" className="sideMenuLink">
              <ChatIcon className="sideMenuIcon" />
              <span className="sideMenuListItemText">Chats</span>
            </Link>
          </li>
        </ul>
        <ul className="sideMenuList">
          <li className="sideMenuListItem">
            <div className="sideMenuLink" onClick={handleLogout}>
              <LogoutIcon className="sideMenuIcon" />
              <span className="sideMenuListItemText">Logout</span>
            </div>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default SideMenu;
