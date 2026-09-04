import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Alert from "./Alert";

function Layout({alert}) {
  return (
    <>
      
      <Navbar />
      <Alert alert={alert} />
      <div style={{ "display": "flex" }}>
        <SideBar style={{"width": "250px"}} />

        <div style={{ "flex": 1, "padding": "20px" }}>
       
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;