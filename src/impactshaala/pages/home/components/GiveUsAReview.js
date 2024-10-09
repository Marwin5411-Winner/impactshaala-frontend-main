import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";


const GiveUsAReview = ({data}) => {
    return (
        <div>
             <Card>
        <Card.Body>
           <Row>
             <Col style={{textAlign: "center"}} className="pt-2 d-flex">
               <h4 className="text-primary text-center">Give us a review</h4>
            </Col>
           </Row>
           <Row>
              <Col className="py-2" >
                <Link to="/giveusareview">
                  <Button variant="outline-primary" style={{width: "100%", borderRadius: "100px", fontWeight: "700"}}>Click Here</Button>
                </Link>
              </Col>
            </Row>
        </Card.Body>

     </Card>
        </div>
    )
};

export default GiveUsAReview