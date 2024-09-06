import React from "react";

//header
import Header from "../../components/partials/dashboard/HeaderStyle/header";

//sidebar
import RightSidebar from "../../components/partials/dashboard/SidebarStyle/rightsidebar";

//sidebar
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";
import { Outlet } from "react-router-dom";

// outlet component renders the child route's component, the routes are defined in the default-router.js
const Default = () => {
  return (
    <>
      <div>
        {/* <div id="content-page" className="content-page"> */}
        {/* <DefaultRouter/> */}
        <Outlet />
        {/* </div> */}
      </div>
    </>
  );
};

export default Default;
