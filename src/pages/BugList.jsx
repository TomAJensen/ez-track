import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import {useApiClient} from "../services/apiClient.js";
import "../components/InfoViewer.css";
import EzTrackTitle from "../components/EzTrackTitle.jsx";
function BugList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { apiFetch } = useApiClient();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await apiFetch("http://10.0.0.72:8080/bugs");

        setItems(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleSelect = (item) => {
    navigate(`/bug/${item.id}`);
  }

  const filter = (items, term) => {

    if (term === '') {
      return items;
    }

    return items.filter((item) => {
      return item.title.toLowerCase().includes(term.toLowerCase()); /* ||
        item.description.toLowerCase().includes(term.toLowerCase()) > -1 ||
        item.stepsToDuplicate.toLowerCase().includes(term.toLowerCase()); */
    })
  }
  const filteredItems = filter(items, searchTerm);

  return (
    <>
      <div><EzTrackTitle pageName={" - Current Bugs"}/></div>
      <div><hr/></div>
      <button style={{marginLeft:".5rem", marginRight:".5rem"}} onClick={() => {
        navigate(`/bug/-1`);
      }}>New Bug...</button>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id} className={"bugListItem"}>hyp-{item.id}:
            <button style={{marginLeft:"10px"}} onClick={() => handleSelect(item)}>View</button>
            <span style={{marginLeft:"3rem"}}>Assigned to: {item.user != null ? item.user.name : 'Unassigned'}</span>
            <div className={"bugTitle"}>
              {item.title}:
              <hr/>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default BugList;