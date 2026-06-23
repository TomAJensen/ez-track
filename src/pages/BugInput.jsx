import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import {useApiClient} from "../services/apiClient.js";  // custom hook
import EzTrackTitle from "../components/EzTrackTitle.jsx";

function BugInput() {
  const startingItem = {
    title: "",
    description: "",
    state: "",
    stepsToDuplicate: "",
    assignedTo: null,
    createdBy: null,
    id: null
  };
  const [formData, setFormData] = useState(startingItem);
  const [originalItem, setOriginalItem] = useState(startingItem);
  const [bugDataInfo, setBugDataInfo] = useState(undefined);
  const { apiFetch, saveFormData, saveBugDataInfo } = useApiClient();
  const [selectedUser, setSelectedUser] = useState("Unassigned");
  const [originalUser, setOriginalUser] = useState('Unassigned');
  const { id } = useParams()
  const navigate = useNavigate()
  // const location = useLocation();

  useEffect(() => {
    async function fetchItems() {
      if (bugDataInfo !== undefined) {
        return;
      }
      try {
        if (Number(id) !== -1) {
          const item = await apiFetch(`http://10.0.0.72:8080/bugs/${id}`);
          setFormData(item)
          setOriginalItem(item)
          setSelectedUser(item.user != null ? item.user.name : 'Unassigned')
          setOriginalUser(item.user != null ? item.user.name : 'Unassigned')
          const data = await apiFetch(`http://10.0.0.72:8080/bug_data_info/${id}`);
          if(data.length > 0) {
            setBugDataInfo(data[0])
          } else {
            setBugDataInfo({id:null, bugData:""});
          }

          console.log(bugDataInfo)
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


  // Check if anything has changed
  let isDirty;
  if(originalItem === undefined) {
    isDirty = false
  } else {
    isDirty = formData.title !== originalItem.title ||
      formData.description !== originalItem.description ||
      formData.stepsToDuplicate !== originalItem.stepsToDuplicate || originalUser !== selectedUser;
  }
  // Setup header based on new or updating bug.
  const header = formData.id !== null ?
    'hyp-' + formData.id : "New Bug...";
  const updateButtonText = formData.id !== undefined ?
    'Save': 'Create';

  const onCancel = () => {
    navigate('/bug-list');
  }
  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };
  const userSelect =       <select
    id="user-select"
    value={selectedUser}
    onChange={handleChange}
    className='bugInput'
    style={{width:'25%'}}
  >
    <option value="Unassigned">Unassigned</option>
    <option value="Tom">Tom</option>
    <option value="Carole">Carole</option>
  </select>

  return(
    <>
      <div><EzTrackTitle pageName={` - ${header}`}/></div>
      {/*<div style={{textAlign:"left", marginLeft:"5rem"}}><h3 className={"heading"} style={{marginBottom:"1rem"}}>{header}</h3></div>*/}
      <div style={{textAlign:"left", marginTop:"2rem", marginLeft:"5Rem"}}>
        <h3>Assigned to: {userSelect}
          <span style={{marginLeft:"3rem"}}>Status: {formData.state}</span>
        </h3></div>
      <div>
        <h4 style={{marginBottom:"0px"}}>Title:</h4>
        <input style={{textAlign:"left"}} className={"bugInput"} type="text" value={formData.title}
               onChange={e =>
                 setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>
      <div >
        <h4 style={{marginBottom:"0px", marginTop:".5rem"}}>Description:</h4>
        <textarea className={"bugInput"} value={formData.description} rows="5"
               onChange={e =>
                 setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      <div >
        <h4 style={{marginBottom:"0px"}}>Steps to Duplicate:</h4>
        <textarea className={"bugInput"} value={formData.stepsToDuplicate} rows="5"
                  onChange={e =>
                    setFormData(prev => ({ ...prev, stepsToDuplicate: e.target.value }))}
        />
      </div>
      <div>
        <button style={{marginRight: ".5em"}} onClick={onCancel}>Cancel</button>
        <button disabled={isDirty === false}
                onClick={() => {
                  // saveBugDataInfo({...bugDataInfo, bugId:formData.id}).then(()=>{});
                  saveFormData({...formData, user:{name:selectedUser}}).finally(() => onCancel());
                }}>{updateButtonText}
        </button>
        <hr/>
      </div>
      <div>
        <h3>Additional Data:</h3>
        <textarea className={"bugInput"} value={bugDataInfo !== undefined ? bugDataInfo.bugData: "" } rows="5"
                  onChange={e =>
                    setBugDataInfo(prev => ({ ...prev, bugData: e.target.value }))}
        />

      </div>
    </>

  )

}

export default BugInput;