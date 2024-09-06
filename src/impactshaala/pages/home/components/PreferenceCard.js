import { Image, Card, Row, Col} from "react-bootstrap";
import user1 from "../../../../assets/images/user/1.jpg";

function PreferenceCard(props) {
  
  return (
    <>
    <h4 className="text-primary" style={{textAlign: "center"}}>Discover Nearby Projects</h4>
    <Card>
      <Card.Body>
        <div className="p-3 mb-3" style={{ background: "#0030491A", borderRadius: "10px" }}> 
        <Row>
          <Col md={2}>
            <Image height={32} width={32} src={user1} roundedCircle />
          </Col>
          <Col md={10}>
            <Row>
              <Col md={12}>
                <h5>Shubham Pandey</h5>
              </Col>
              <Col md={12}>
                <sup>ML Researcher</sup>
              </Col>
            </Row>
          </Col>
        </Row>
        </div>
        <div className="p-3 mb-3" style={{ background: "#0030491A", borderRadius: "10px" }}> 
        <Row>
          <Col md={2}>
            <Image height={32} width={32} src={user1} roundedCircle />
          </Col>
          <Col md={10}>
            <Row>
              <Col md={12}>
                <h5>Shubham Pandey</h5>
              </Col>
              <Col md={12}>
                <sup>ML Researcher</sup>
              </Col>
            </Row>
          </Col>
        </Row>
        </div>
        
      </Card.Body>
    </Card>
    </>
  );
}

export default PreferenceCard;