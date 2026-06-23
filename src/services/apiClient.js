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
      return;
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
    const url = bugDataInfo.id === null ? 'http://localhost:8080/bug_data_info' :
      `http://localhost:8080/bug_data_info/${bugDataInfo.id}`;
    await apiFetch(url, {method: method, body: JSON.stringify(bugDataInfo)})
  }

  return { apiFetch, saveFormData, saveBugDataInfo };
}