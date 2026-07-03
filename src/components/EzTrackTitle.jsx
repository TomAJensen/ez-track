import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "./EzTrackTitle.css";

function EzTrackTitle({pageName, showLogout=true}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  const goHome = () => {
    navigate("/login");
  }
  return (
    <div>
      <h1 className="page-title">EZ Track {pageName!== undefined ? pageName : ""}
        {showLogout ? <button  onClick={handleLogout}>Logout</button> : ""}
      </h1>
      <div className="page-title"><button onClick={goHome} className="home">Home</button></div>
    </div>
  )
}

export default EzTrackTitle;