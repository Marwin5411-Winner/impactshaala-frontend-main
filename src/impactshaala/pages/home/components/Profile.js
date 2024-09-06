import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import defaultUser from '../../../../assets/images/defaultUser.png';

// card that as the profile image and the name of the user

function ProfileCard({user}) {
  return (
    <>
      <Card className="position-relative rounded overflow-hidden mt-3">
        <div className="position-absolute d-flex flex-row" style={{zIndex: "10", top: "0px", left: "0px", width: "100%", padding: "0px"}}>
          <div className="" style={{flexGrow: "1", height: "5px", background: "#D62828"}}></div>
          <div className="" style={{flexGrow: "1", height: "5px", background: "#F77F00"}}></div>
          <div className="" style={{flexGrow: "1", height: "5px", background: "#FCBF49"}}></div>
        </div>
        <Card.Body>
          <Row>
            <Col className="m-2">
              <Card.Title>Profile</Card.Title>
            </Col>
          </Row>
          <Row>
            <Col className="" md={4}>
              <Image
                src={user.profilePic?user.profilePic:defaultUser}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  border: "3px solid #D62828",
                  padding: "2px" // Adjust padding as needed
                }} 
                roundedCircle
                />
            </Col>
            <Col md={8}>
                <h5 className="text-primary" style={{fontWeight: "bold"}}>Hi, {user.name}</h5>
                <div className="d-flex flex-row justify-content-start" style={{gap: "2px"}}>
                  <p className="">{user.tagline}</p>
                  {
                    user.accountType === "ORGANIZATION" && (
                      <i className="icon material-symbols-outlined">apartment</i>
                    )
                  }
                </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-left mt-2">
              <Card.Text>
                {user.description}
              </Card.Text>
            </Col>
          </Row>
          <Row className="w-full">
            <Col md={12}>
             <Link to="/dashboard/app/profile" className="btn btn-outline-primary my-2" style={{borderRadius: "100px", fontWeight: "700", width: "100%"}}>View Profile</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileCard;
