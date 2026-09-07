import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Office from "./Office";
import Builty from "./Builty";
import City from "./City";
import BuiltyReport from "./BuiltyReport";
import Customer from "./Customer";
import { useState } from "react";
import User from "./User";
import Role from "./Role";

function ProtectedRoute({ children }) {
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login showAlert={showAlert} />} />

        {/* <Route
          element={
            <ProtectedRoute>
              <Layout alert={alert} showAlert={showAlert} />
            </ProtectedRoute>
          }
        > */}
        <Route
          element={<Layout alert={alert} showAlert={showAlert} />}
        >
          <Route path="/" element={<Dashboard showAlert={showAlert} />} />
          <Route path="/user" element={<User showAlert={showAlert} />} />
          <Route path="/role" element={<Role showAlert={showAlert} />} />
          <Route path="/dashboard" element={<Dashboard showAlert={showAlert} />} />
          <Route path="/office" element={<Office showAlert={showAlert} />} />
          <Route path="/builty" element={<Builty showAlert={showAlert} />} />
          <Route path="/city" element={<City showAlert={showAlert} />} />
          <Route path="/builtyreport" element={<BuiltyReport showAlert={showAlert} />} />
          <Route path="/customer" element={<Customer showAlert={showAlert} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;