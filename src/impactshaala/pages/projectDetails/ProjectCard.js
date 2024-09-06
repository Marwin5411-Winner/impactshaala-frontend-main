import { Col, Row, Image, Card, Button } from "react-bootstrap";
import user1 from "../../../assets/images/user/1.jpg";
import { useNavigate } from "react-router-dom";
import {OverlayTrigger} from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";

function Project({ name }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/project/121");
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {true ? "Remove from saved" : "Save this project"}
    </Tooltip>
  );

  return (
    <Card>
      <Card.Body style={{ cursor: "pointer" }} onClick={handleClick}>
        <Row className="m-2">
          <Col xs={3} lg={1} className="d-flex justify-content-center align-items-start">
            <Image src={user1} rounded height={"50px"} width={"50px"} />
          </Col>
          <Col style={{ paddingLeft: "15px" }}>
            <h4 className="font-weight-bold text-primary mx-2" style={{ fontWeight: 600 }}>Ashwin Modi</h4>
            <p className="mx-2 text-secondary" >AI Researcher</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="text-secondary pb-3">
              <div name="project-post-content">
                <Row>
                  <Col className="" xs={12} lg={12} >
                    <p className="text-secondary text-justify" style={{textAlign:"justify"}}>
                      <b>Title: </b>Gender studies, globalization, social movements, technology and social problems, and the impact of globalization on society.
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
              </div>
            </div>
            <Button variant="primary">Save Post</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Project;
