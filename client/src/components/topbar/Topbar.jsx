import "./topbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const { user } = useContext(AuthContext);
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">

            </div>
            <div className="topbarCenter">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="logo">Gradessy</span>
                </Link>
            </div>
            <div className="topbarRight">
                <Link to={`/profile/${user.username}`}>
                    <AccountCircleIcon sx={{ color: "white" , fontSize: "2em"}}/>
                </Link>
            </div>
        </div>)
}