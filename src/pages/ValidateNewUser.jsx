
import EzTrackTitle from "../components/EzTrackTitle.jsx";
import { useSearchParams } from 'react-router-dom';
import {useState} from "react";
import {useApiClient} from "../services/apiClient.js";  // custom hook
import {useNavigate} from "react-router-dom";

export default function ValidateNewUser() {
  const [searchParams, setSearchParams] = useSearchParams();

  const origEmail = searchParams.get("email");
  const [email, setEmail] = useState( origEmail ?? "");
  const [validationCode, setValidationCode] = useState("");
  const {validateNewUser} = useApiClient();
  const navigate = useNavigate();

  const validateUser = () => validateNewUser({"email": email, "validationCode": validationCode});

  return <>
    <EzTrackTitle pageName={"Registration Validation"} showLogout={false}/>
    <div><hr/></div>
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: "2rem" }}>
      <h2 className="signupCaption" style={{ marginBottom: 4 }}>Validate Account</h2>
      <p style={{  marginBottom: 24 , color: "#34c6bd", fontSize:20}}>Please enter your email and validation code to validate your account.</p>
      <label style={{  color: "#34c6bd", display: "block", fontSize: 20, fontWeight: 500, marginBottom: 6, textTransform: "capitalize" }}>
        Email:
      </label>
      <input
        style={{ fontSize:20, width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", boxSizing: "border-box",  }}
        disabled={origEmail !== null} type={"text"} name={"email"} value={email}
        onChange={(e) => setEmail(e.target.value)}/>
      <label style={{  marginTop:"2rem", color: "#34c6bd", display: "block", fontSize: 20, fontWeight: 500, marginBottom: 6, textTransform: "capitalize" }}>
        Validation Code:
      </label>
      <input
        style={{ fontSize:20, width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", boxSizing: "border-box",  }}
        type={"text"} name={"validation-code"} value={validationCode} onChange={(e) => setValidationCode(e.target.value)}/>
      <button
        style={{marginTop:"2rem"}}
        onClick={() => {validateUser().then(() => {
          navigate("/login");
        }).catch((err) => {
          console.log(err);
        })
        }}
      >Validate</button>
    </div>
  </>
}