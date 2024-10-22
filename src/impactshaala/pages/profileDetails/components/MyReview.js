import React, { useState } from "react";
import { Row, Col, Container, Card, Nav, Tab } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

// Sample Review Data
const reviewsGiven = [
  {
    userName: "John Doe",
    userType: "Entrepreneur",
    rating: 5,
    feedback: "Excellent collaboration!",
  },
  {
    userName: "Jane Smith",
    userType: "Working Professional",
    rating: 4,
    feedback: "Great experience working together.",
  },
];

const reviewsReceived = [
  {
    userName: "Alice Johnson",
    userType: "Educator",
    rating: 5,
    feedback: "Amazing work ethics and dedication!",
  },
  {
    userName: "Mike Brown",
    userType: "Student",
    rating: 5,
    feedback: "Very insightful and helpful.",
  },
];

// Component for rendering a single review block
const ReviewBlock = ({ userName, userType, feedback }) => (
  <Col sm={4} className="mb-4">
    <Card>
      <Card.Body>
        <Card.Title><strong>{userName}</strong></Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><strong>{userType}</strong></Card.Subtitle>
        <Card.Text>{feedback}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

const ReviewComponent = () => {
  const [key, setKey] = useState("given");

  return (
    <Container fluid className="px-5">
      {/* Navigation Tabs */}
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="given">Given</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="received">Received</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content */}
        <Tab.Content>
          <Tab.Pane eventKey="given">
            <Row>
              {reviewsGiven.map((review, index) => (
                <ReviewBlock
                  key={index}
                  userName={review.userName}
                  userType={review.userType}
                  feedback={review.feedback}
                />
              ))}
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="received">
            <Row>
              {reviewsReceived.map((review, index) => (
                <ReviewBlock
                  key={index}
                  userName={review.userName}
                  userType={review.userType}
                  feedback={review.feedback}
                />
              ))}
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default ReviewComponent;
