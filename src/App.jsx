import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import './App.css'
// import EzTrackTitle from "./components/EzTrackTitle.jsx";
import BugInput from "./pages/BugInput";
import BugList from "./pages/BugList";
import UserListPage from "./pages/UsersListPage.jsx";
import UserInputPage from "./pages/UserInputPage.jsx";

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/bug-list" element={
              <ProtectedRoute>
                <BugList />
              </ProtectedRoute>
            } />
          <Route path="/bug/:id" element={
            <ProtectedRoute>
              <BugInput />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <UserListPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/:id" element={
            <ProtectedRoute>
              <UserInputPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
