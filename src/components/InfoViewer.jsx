import {useState} from "react";
import "./InfoViewer.css";
import BugList from "../pages/BugList.jsx";
import BugInput from "../pages/BugInput.jsx";

function InfoViewer() {
  const [viewList, setViewList] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // const showViewClicked = () => {
  //   console.log("clicked view List");
  //   setViewList(true)}
  // const showBugClicked = () => {
  //   console.log("clicked view bug");
  //   setViewList(false)}


  const itemSelected = (item) => {
    setViewList(false);
    setSelectedItem(item);
  };

  const onCanceled = () => {
    setSelectedItem(null);
    setViewList(true);
  }

  return (
    <div>
      <h3 className={"heading"}>Bug List</h3>
      <button
        onClick={() => {itemSelected({id: undefined, state:'active', title:'', description: ''})}}
      >New Bug...
      </button>
      <div><BugList onSelectItem={itemSelected}/></div>
    </div>)
    // <div>
    //   <BugInput selectedItem={selectedItem} onCancel={() => onCanceled()}/>
    // </div>;
}

export default InfoViewer;