import EzTrackTitle from "../components/EzTrackTitle.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useApiClient} from "../services/apiClient.js";
import Modal from "../components/Modal.jsx";


export default function RecoverPassword() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const {startPasswordRecovery} = useApiClient();

  const validate = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return false;
    }
    return true;
  }

  const handleRecovery = () => {
    if(!validate()) {
      return;
    }
    startPasswordRecovery({value:email, type: 0}).then(() => {
      setIsOpen(true);
    });
      }

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  }

  const modalButtons = [
    {
      caption: "Ok",
      action: () => {
        setIsOpen(false);
        navigate("/validate-recovery?email=" + email);
      },
      isDefault: true
    }
  ]

  return <>
    <EzTrackTitle showLogout={false} pageName=" - Recover Password" />
  <div><hr/></div>
    <div><h3>A recovery link will be sent to your email.</h3></div>
    <div>
      <label style={{  color: "#34c6bd", display: "block", fontSize: 20, fontWeight: 500, marginBottom: 6, textTransform: "capitalize" }}>
        Email:
      </label>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        placeholder={"jane@example.com"}
        style={{ fontSize:20, width: "50%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", boxSizing: "border-box",  }}
      />
      {error && <p style={{ color: "#ef4444", fontSize: 16, marginTop: 4 }}>{error}</p>}
    </div>

    <div><button
      disabled={!email}
      onClick={handleRecovery}
      style={{marginTop:"1em", padding:".5em"}}>Recover Password</button>
    </div>
    {/*Show success dialog.*/}
    <Modal buttons={modalButtons} isOpen={isOpen} >
      <p style={{ color: "#16a34a", margin: 16, fontWeight: 500  }}>✓ An email with recovery instructions has been sent to your email.</p>
    </Modal>
    </>
}