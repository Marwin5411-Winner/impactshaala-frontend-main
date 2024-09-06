import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getLocalStorage } from "../../../../utilities/localStorage";

function Internship() {
  const [user, setUser] = useState()

  useEffect(() => {
    const user = getLocalStorage("user")
    setUser(user)
  }, [])

  return (user && user.accountType === "INDIVIDUAL" && user.userType1.toLowerCase() === "student")?(
     <Card>
        <Card.Body>
           <Row>
             <Col className="pt-2">
               <h4 className="text-center text-primary">Seeking Part-Time Work or an Internship?</h4>
							 <p className="text-center mt-2" style={{fontSize: "10px",}}>
							  Whether you're looking to hire a fresh graduate or a student intern, we're here to connect you with suitable candidates
							 </p>
							
            </Col>
           </Row>
           <Row>
              <Col className="py-2" >
                <Link to={"/job-or-internship/apply"}>
                  <Button variant="outline-primary" style={{width: "100%", borderRadius: "100px", fontWeight: "700"}}>Connect With Us</Button>
                </Link>
              </Col>
            </Row>
        </Card.Body>
     </Card>
  ): user && (user.accountType === "ORGANIZATION" || user.userType1.toLowerCase() === "working professional") ? (
    <Card>
      <Card.Body>
        <Row>
          <Col className="pt-2">
            <h4 className="text-center text-primary">Seeking Fresh Talent?</h4>
            <p className="text-center mt-2" style={{fontSize: "10px",}}>
              Whether you're looking to hire a fresh graduate or a student intern, we're here to connect you with suitable candidates
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="py-2" >
            <Link to={"/job-or-internship/create-posting"}>
              <Button variant="outline-primary" style={{width: "100%", borderRadius: "100px", fontWeight: "700"}}>Get Started</Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
  </Card>
  ): null;
}

export default Internship;    