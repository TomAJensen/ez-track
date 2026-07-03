import {useNavigate} from "react-router-dom";

function EzTrackWelcome() {
  const navigate = useNavigate()
  const gotoSignup = () => {
    navigate("/signup")
  }

  return <div>
    <h1>Welcome to EZ Track</h1><button  onClick={gotoSignup}>Register as new user</button>
  </div>
}

export default EzTrackWelcome;