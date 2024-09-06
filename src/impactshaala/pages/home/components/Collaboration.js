import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Colaberation() {
  return (
     <Card>
        <Card.Body>
           <Row>
             <Col style={{textAlign: "center"}} className="pt-2 d-flex">
               <h4 className="text-primary">Need A Collaborative Partner? We're Here to Help</h4>
            </Col>
           </Row>
           <Row>
              <Col className="py-2" >
                <Link to="/collab/create-collab">
                  <Button variant="outline-primary" style={{width: "100%", borderRadius: "100px", fontWeight: "700"}}>Click Here</Button>
                </Link>
              </Col>
            </Row>
        </Card.Body>

     </Card>
  );
}

export default Colaberation;    