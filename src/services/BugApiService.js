/**
 * Save the bug to the DB
 * @param bugInfo the object to save.
 * @returns {Promise<void>}
 */
async function saveFormData(bugInfo) {
  // Determine if new bug or updating.
  const method = bugInfo.id === undefined ? 'POST' : 'PUT';
  const url = bugInfo.id === undefined ?
    'http://localhost:8080/bugs':
    `http://localhost:8080/bugs/${bugInfo.id}`;


  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bugInfo)
  });

  if (!response.ok) {
    console.error("Save failed");
    return;
  }

  const savedBug = await response.json();
  console.log("Saved bug:", savedBug);
}

async function saveBugDataInfo(bugDataInfo) {
  const method = bugDataInfo.id === undefined ? 'POST' : 'PUT';
  const url = bugDataInfo.id === undefined ? 'http://localhost:8080/' :
    `http://localhost:8080/bug_data_info/${bugDataInfo.id}`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bugDataInfo)

  });
  if (!response.ok) {
    console.error("Save failed");
    return;
  }

  const savedBugDataInfo = await response.json();
  console.log("Saved bug:", savedBugDataInfo);
}

async function fetchBugDataInfo(bugDataInfo) {
  if(bugDataInfo.id !== undefined) {
    return;
  }
  try {
    const response = await fetch(`http://localhost:8080/bug_data_info/${selectedItem.id}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    return data[0]
  } catch (err) {
    console.log(err.message || "Something went wrong");
  } finally {
    // setLoading(false);
  }
}
export {saveFormData, saveBugDataInfo, fetchBugDataInfo};
