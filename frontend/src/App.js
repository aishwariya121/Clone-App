import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Office from "./Components/Office";
import Builty from "./Components/Builty";
import City from "./Components/City";
import BuiltyReport from "./Components/BuiltyReport";
import Customer from "./Components/Customer";
import { useState } from "react";
import User from "./Components/User";
import Role from "./Components/Role";



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
  }

  return (
    <Router>
      <Routes>

        {/* Login page */}
        <Route path="/login" element={<Login showAlert={showAlert} />} />

        {/* Layout */}
        <Route element={<Layout alert={alert} showAlert={showAlert} />}>
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