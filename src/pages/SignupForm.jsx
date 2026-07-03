import { useState } from "react";
import EzTrackTitle from "../components/EzTrackTitle.jsx";
import {useApiClient} from "../services/apiClient.js";  // custom hook
import "./SignupForm.css"
import Modal from "../components/Modal.jsx";
import {useNavigate} from "react-router-dom";

export default function SignupForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const {createNewUser} = useApiClient();
  const navigate = useNavigate()

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Name is required.";
    if (!fields.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = "Enter a valid email address.";
    if (!fields.password) errs.password = "Password is required.";
    else if (fields.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    return errs;
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    createNewUser(fields).then((data) => {
      console.log(data);
      setSubmitted(true);
      setIsModalOpen(true);
      setErrors({});
    }
    ).catch(error => {
      const err = {networkError:error.message};
      setIsModalOpen(true);
      setErrors(err)
    });
  };

  const onOk = () => {
    setIsModalOpen(false)
    navigate("/validate-new-user?email=" + fields.email);
  }

  const modalButtons = [
    {
      caption: "Ok",
      action: () => onOk(),
      isDefault: true
    }
  ]

  const modalErrorButtons = [
    {
      caption: "Ok",
      action: () => setIsModalOpen(false),
      isDefault: true
    }
  ]



  return (
    <>
      <EzTrackTitle pageName={""} showLogout={false}/>
      <div><hr/></div>
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: "2rem" }}>
      <h2 className="signupCaption" style={{ marginBottom: 4 }}>Create an account</h2>
      <p style={{  marginBottom: 24 , color: "#34c6bd", fontSize:20}}>Fill in your details to get started.</p>

      {["name", "email"].map((field) => (
        <div key={field} style={{ marginBottom: 16 }}>
          <label style={{  color: "#34c6bd", display: "block", fontSize: 20, fontWeight: 500, marginBottom: 6, textTransform: "capitalize" }}>
            {field}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={fields[field]}
            onChange={handleChange}
            placeholder={field === "email" ? "jane@example.com" : "Jane Smith"}
            style={{ fontSize:20, width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", boxSizing: "border-box",  }}
          />
          {errors[field] && <p style={{ color: "#ef4444", fontSize: 16, marginTop: 4 }}>{errors[field]}</p>}
        </div>
      ))}

      <div style={{ marginBottom: 20 }}>
        <label style={{ color: "#34c6bd", display: "block", fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={fields.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            style={{fontSize:20, width: "100%", padding: "8px 40px 8px 12px", borderRadius: 8, border: "1px solid #d1d5db", boxSizing: "border-box" }}
          />
          <button
            onClick={() => setShowPassword((v) => !v)}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && <p style={{ color: "#ef4444", fontSize: 16, marginTop: 4 }}>{errors.password}</p>}
      </div>

      <button
        onClick={handleSubmit}
        style={{ width: "100%", padding: "10px",  border: "none", borderRadius: 8, fontWeight: 500, cursor: "pointer" }}
      >
        Create account
      </button>

      {/*{submitted && (*/}
      {/*  <p style={{ color: "#16a34a", marginTop: 16, fontWeight: 500 }}>✓ Account created successfully!</p>*/}
      {/*)}*/}
      {submitted &&
      <Modal isOpen={isModalOpen} buttons={modalButtons}>
        <p style={{ color: "#16a34a", margin: 16, fontWeight: 500  }}>✓ Account created successfully!</p>
      </Modal>  }
      {errors.networkError &&
        <Modal buttons={modalErrorButtons} isOpen={isModalOpen}>
          <p style={{color:"#ef4444", fontSize: 16, margin: 16 }}>{errors.networkError}</p>
        </Modal>}
    </div>
      </>
  );
}