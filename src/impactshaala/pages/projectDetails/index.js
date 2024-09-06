import { Button, Col, Container, Row } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import ProjectDetailsCard from "./ProjectDetail";
import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import Project from "./ProjectCard";

function ProjectDetailsIndex() {
  return (
    <div>
      {/* header and side bar */}
      <Header />
      <Sidebar />
      {/* main div it main-content it makes the layout to arange properly do not remove this  */}
      <div className="main-content" style={{ overflowX: "hidden" }}>
        <Container fluid>
         
              <Row>
                <Col xs={12} lg={4}>
                  <Project />
                  <Project />
                  <Project />
                  <Project />
                  <Project />
                  <Project />
                </Col>
                <Col xs={12} lg={8} className="">
                  <ProjectDetailsCard />
                </Col>
              </Row>
           
        </Container>
      </div>
    </div>
  );
}

export default ProjectDetailsIndex;
