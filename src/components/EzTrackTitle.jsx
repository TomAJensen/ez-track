import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "./EzTrackTitle.css";

function EzTrackTitle({pageName}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <div>
      <h1 className="page-title">EZ Track {pageName!== undefined ? pageName : ""} <button  onClick={handleLogout}>Logout</button>
      </h1>

    </div>
  )
}

export default EzTrackTitle;