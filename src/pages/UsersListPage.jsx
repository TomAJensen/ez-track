import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import {useApiClient} from "../services/apiClient.js";
import "../components/InfoViewer.css";
import EzTrackTitle from "../components/EzTrackTitle.jsx";

export default function UserListPage() {
  const { apiFetch } = useApiClient();
  const navigate = useNavigate()
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await apiFetch("http://10.0.0.72:8080/admin/users");

        setItems(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        // setLoading(false);
      }
    }

    fetchItems();
  }, []);

  const goBack = () => {
    navigate('/bug-list');
  }

  const newUser = () => {};
  if (error !== '') {
    return <>
      <div>This is for special people.</div>
      <button style={{marginLeft:"10px"}} onClick={() => goBack()}>Back</button>
    </>;
  }
  return <>
    <div><EzTrackTitle pageName={"- Users"}/></div>
    <div><hr/></div>

      <button style={{marginLeft:".5rem", marginRight:".5rem", marginBottom: ".25rem"}} onClick={() => goBack()}>Back</button>
      <button style={{marginLeft:".5rem", marginRight:".5rem"}} onClick={() => newUser()}>Create User</button>

    <ul>
      {items.map((item) => (
        <li key={item.id} className={"bugListItem"}>{item.name}:
          <div className={"bugTitle"}>
            {item.email}:
            <hr/>
          </div>
        </li>
      ))}
    </ul>

    </>;

}

