import { Col, Row, Image, Card, Button, Container } from "react-bootstrap";
import user1 from "../../assets/images/user/1.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import CollaborationPopup from "../collaborationPopup/CollaborationPopup";
import WarningPopup from "../WarningPopup";


// this is the project card component
function ProjectCard({
  myProfile = false,
  ongoing = false,
}) {
  const navigate = useNavigate();
  const [saveProject, setSaveProject] = useState(false);
  const [show, setShow] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {saveProject ? "Remove from saved" : "Save this project"}
    </Tooltip>
  );

  return (
    <Card>
      <WarningPopup 
        show={showWarning} 
        close={() => setShowWarning(false)} 
        handleAccept={() => setShow(true)} 
      />
      <CollaborationPopup show={show} handleClose={() => setShow(false)}/>
      <Card.Body style={{ cursor: "pointer" }}>
        <div name="project-post-content">
          <Row>
            <Col
              xs={3}
              lg={1}
              className="d-flex justify-content-center align-items-start"
            >
              <Image src={user1} rounded height={"50px"} width={"50px"} />
            </Col>
            <Col xs={9} lg={8}>
              <h4
                className="font-weight-bold"
                style={{ fontWeight: 600, color: "#FBAD17" }}
              >
                Cristopher Nolan
              </h4>
              <p>ML Researcher</p>
              <p className="text-secondary text-justify" style={{textAlign:"justify"}}>
                <b>Title: </b>Gender studies, globalization, social movements, technology and social problems, and the impact of globalization on society.
                Title: Gender studies, globalization, social movements, technology and social problems, and the impact of globalization on society
                <br/>
              </p>
              <Row className="text-secondary">
                <Col>
                  <b>Date Range: </b><br/>12th August 2024 - 12th January 2025
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={12} className="d-flex justify-content-between">
              <div className="pt-5 d-flex flex-row" style={{gap: "5px"}}>
                <Link to="/project/121" className="btn btn-primary rounded-pill text-white px-3" style={{borderRadius: "100px", fontWeight: "bold"}} >View more</Link>
                { myProfile && !ongoing && <Link to="/dashboard/my-projects/1" className="btn btn-outline-primary bg-white text-primary px-3 rounded-pill" style={{fontWeight: "bold"}}>Dashboard</Link>}
                { !myProfile && (
                  <button 
                    className="btn btn-outline-primary bg-white text-primary px-3 rounded-pill" 
                    style={{fontWeight: "bold"}} 
                    onClick={() => setShowWarning(true)}
                  >
                    Collaborate
                  </button>
                )}
              </div>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <div className={saveProject ? "text-primary" : ""}>
                  <i
                    className={`material-symbols-outlined`}
                    onClick={() => {
                      setSaveProject(!saveProject);
                    }}
                  >
                    {saveProject ? "bookmark_added" : "bookmark_add"}
                  </i>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
