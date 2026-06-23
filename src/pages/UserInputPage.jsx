
import EzTrackTitle from "../components/EzTrackTitle.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {useApiClient} from "../services/apiClient.js";  // custom hook
import "../components/EzTrackTitle.jsx"
import {useEffect, useState} from "react";


function UserInputPage () {
  const {apiFetch} = useApiClient();
  const [user, setUser] = useState({name:""});
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchItems() {
      if(id === "new") {
        return;
      }
      try {
        if (Number(id) !== -1) {
          const userInfo = await apiFetch(`http://10.0.0.72:8080/admin/users/${id}`);
          setUser(userInfo);
        }
      } catch (err) {
        if (err.message.includes('403')) {
          navigate('/login');
          return;
        }
        console.log(err.message || "Something went wrong");
      } finally {
        // setLoading(false);
      }
    }
    fetchItems().then(() => {});
  });

  return <>
    <EzTrackTitle pageName={`${id}`}/>
    <div>Name:{user.name}</div>
    </>

}

export default UserInputPage