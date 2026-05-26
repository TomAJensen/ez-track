import {useState} from "react";

function InfoViewer() {
  const [viewList, setViewList] = useState(true);
  const showViewClicked = () => {
    console.log("clicked view List");
    setViewList(true)}
  const showBugClicked = () => {
    console.log("clicked view bug");
    setViewList(false)}

  if (!viewList) return (
    <div><h3>Viewing bug</h3><button onClick={showViewClicked}>View List</button></div>
  );
  return (
    <div><h3>Bug List</h3><button onClick={showBugClicked}>View Bug</button></div>
  )
}

export default InfoViewer;