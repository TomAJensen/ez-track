import EzTrackTitle from "../components/EzTrackTitle.jsx";
import "./NewUserRegisterPage.css"

export default function NewUserRegisterPage() {
  return <>
    <EzTrackTitle pageName={" - Create User."} showLogout={false}/>
    <div className="entry-field">First Name:<input  className="entry-field" type={"text"} /></div>
    <div className="entry-field">Email:<input className="entry-field" type={"text"} /></div>
    <div className="entry-field">Password:<input className="entry-field" type={"text"} /></div>
    <div className="entry-field"> Re-Enter Password:<input className="entry-field" type={"text"} /></div>
    <div><button style={{marginTop:".5rem"}}>Submit</button></div>
  </>
}