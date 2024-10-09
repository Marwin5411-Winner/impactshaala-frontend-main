import { useState } from "react";
import { Row, Col, Card, Button, Form, Container } from "react-bootstrap";

import PageTemplate1 from "../../../components/PageTemplate1";
import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";

function GiveUsAReview() {
  const [selectedLabel, setSelectedLabel] = useState("");

  const handleNeeded = (e) => {
    setSelectedLabel(e.target.value);
    console.log(`Selected needed: ${e.target.value}`);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Card>
            <Card.Body>
              <Row>
                <Col style={{ textAlign: "center" }} className="pt-2 d-flex">
                  <h2 className="text-primary text-center">Give us a review</h2>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>What do you have for us!</Form.Label>
                    <Form.Select
                      aria-label="Label"
                      value={selectedLabel}
                      onChange={handleNeeded}
                    >
                      <option value="Appreciation">Appreciation</option>
                      <option value="Feedback">Feedback</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Rated Us Based on your Experience</Form.Label>
                    <p>Coming soon...</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md="12">
                  <Form.Group>
                    <Form.Label>
                      Please tell us about good experience
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Question (max 150 words)"
                      style={{ minHeight: "100px" }}
                      // value={formData.question}
                      // onChange={handleChange}
                      name="comment"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default GiveUsAReview;
