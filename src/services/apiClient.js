import { useAuth } from "../context/authContext";

export function useApiClient() {
  const { token, logout } = useAuth();

  async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (res.status === 403) {
      logout(); // Token expired or invalid — force re-login
      throw new Error(`API error: ${res.status}`);
      // return;
    }
    if (res.status === 409) {
      const errorInfo = await res.json();
      throw new Error(`User email already exists - ${errorInfo.message}`);
    }
    if(res.status === 204) {
      return {}
    }
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  }

  async function saveFormData(bugInfo) {
    // Determine if new bug or updating.
    const method = bugInfo.id === null ? 'POST' : 'PUT';
    const url = bugInfo.id === null ?
      'http://localhost:8080/bugs':
      `http://localhost:8080/bugs/${bugInfo.id}`;

    await apiFetch(url, {method: method, body: JSON.stringify(bugInfo)})

  }

  async function saveBugDataInfo(bugDataInfo) {
    const method = bugDataInfo.id === null ? 'POST' : 'PUT';
    const url = bugDataInfo.id === null ? 'http://localhost:8080/bug-data-info' :
      `http://localhost:8080/bug_data_info/${bugDataInfo.id}`;
    await apiFetch(url, {method: method, body: JSON.stringify(bugDataInfo)})
  }

  async function createNewUser(userInfo) {
    const url = "http://localhost:8080/users";
    const response = await apiFetch(url, {method: "PUT", body: JSON.stringify(userInfo)})
    console.log(response)
    return response;
  }

  async function validateNewUser(validationInfo) {
    const url = "http://localhost:8080/users";
    const response = await apiFetch(url, {method: "PATCH", body: JSON.stringify(validationInfo)})
    console.log(response)
    return response;
  }

  async function startPasswordRecovery(inputInfo) {
    const url = "http://localhost:8080/password-recoveries";
    const response = await apiFetch(url, {method: "PUT", body: JSON.stringify(inputInfo)})
    console.log(response)
    return response;
  }

  /**
   * {password:"<>", email:"<>", validationCode:"<>"}
   *
   * @param validationInfo
   * @returns {Promise<{}|any>}
   */
  async function completePasswordRecovery(validationInfo) {
    const url = "http://localhost:8080/password-recoveries";
    const response = await apiFetch(url, {method: "POST", body: JSON.stringify(validationInfo)})
    console.log(response)
    return response;
  }

  return { apiFetch, saveFormData, saveBugDataInfo,
    createNewUser, validateNewUser,
    startPasswordRecovery, completePasswordRecovery };
}