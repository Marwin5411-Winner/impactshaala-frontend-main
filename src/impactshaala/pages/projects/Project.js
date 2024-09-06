import { Col, Row, Image, Card, Button, Container } from "react-bootstrap";
import user1 from "../../../assets/images/user/1.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


// this is the project card component
function Project({ name }) {
  const navigate = useNavigate();
  const [saveProject, setSaveProject] = useState(false);

  function handleClick() {
    navigate("/project/121");
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {saveProject ? "Remove from saved" : "Save this project"}
    </Tooltip>
  );

  return (
    <Card>
      <Card.Body style={{ cursor: "pointer" }}>
        <div name="project-post-content">
          <Row onClick={() => navigate("/profile-details/1")}>
            <Col
              md={1}
              className="d-md-flex justify-content-center align-items-start"
            >
              <Image src={user1} rounded height={"50px"} width={"50px"} />
            </Col>
            <Col md={9} className="mt-2 mt-md-0 px-3">
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
                  <b>Paid/Free: </b><br/> Paid
                  <br/>
                  ₹30k - ₹1L / month
                </Col>
                <Col>
                  <b>Project Tenure: </b><br/>6 months
                </Col>
                <Col>
                  <b>Date Range: </b><br/>12th August 2024 - 12th January 2025
                </Col>
                
              </Row>
              <Row className="text-secondary">
                <Col>
                  <b>Location: </b><br/>Onsite
                  <br/>
                  IoTree Minds, Cunningham Road, Bengaluru, India, 560001
                </Col>
              </Row>
                
                
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={12} className="d-flex justify-content-between">
              <div className="pt-5">
                <Button onClick={handleClick} variant="outline-primary bg-primary text-white px-3" style={{borderRadius: "100px", fontWeight: "bold"}}>Easy Apply</Button>
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

export default Project;
