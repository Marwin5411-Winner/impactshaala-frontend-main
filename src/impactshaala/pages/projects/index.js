//libray import
import React from "react";
import { Col, Row } from "react-bootstrap";

//component import 
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import Header from "../../../components/partials/dashboard/HeaderStyle/header";

import Project from "./Project";
//home component
function ProjectHome() {
  return (
    <div>
      {/* header and side bar */}
      <Header />
      <Sidebar />
    {/* main div it main-content it makes the layout to arange properly do not remove this  */}
      <div className="main-content"  style={{ overflowX: "hidden" }}>
            <Row >
                <Project name="1"/>

                <Project name="2"/>

                <Project  name="3"/>

            </Row>
      </div>    
    </div>
  );
}

export default ProjectHome;
