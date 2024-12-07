import { color } from "framer-motion";
import { Button, Col, Container, Row, Card, Dropdown } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";

function ProjectDetailsCard() {
  return (
    <Container fluid className="d-flex justify-content-end py-4">
      <Card style={{ width: "100%" }} className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4 text-center">Post View (Highlight)</h3>

          {/* Title of the Post */}
          <Row className="mb-3">
            <Col>
              <h5>Title of the Post</h5>
              <p className="text-muted">Prompt Engineering Course</p>
            </Col>
          </Row>

          {/* Profile Picture and User Sub Type */}
          <Row className="mb-3">
            <Col md={6}>
              <h5>Profile Picture</h5>
              <div className="d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Profile"
                  className="rounded-circle me-3"
                />
                <p className="mb-0">Pratap Sonkar</p>
              </div>
            </Col>
            <Col md={6}>
              <h5>User Sub Type</h5>
              <p className="text-muted">Clearest one</p>
            </Col>
          </Row>

          {/* Looking to Provide */}
          <Row className="mb-3">
            <Col>
              <h5>Looking to Provide</h5>
              <Row>
                <Col md={4}>
                  <p className="text-muted">Subtype: Mentorship</p>
                </Col>
                <Col md={4}>
                  <p className="text-muted">Keyword: AI Tools</p>
                </Col>
                <Col md={4}>
                  <p className="text-muted">Specific Keyword: Generative AI</p>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Target Audience */}
          <Row className="mb-3">
            <Col>
              <h5>Target Audience</h5>
              <p className="text-muted">Students, AI Enthusiasts, Professionals</p>
            </Col>
          </Row>

          {/* Objective */}
          <Row className="mb-3">
            <Col>
              <h5>Objective</h5>
              <p className="text-muted">
                Learn how to solve complex tasks using Generative AI tools through a structured course.
              </p>
            </Col>
          </Row>

          {/* Event Location */}
          <Row className="mb-3">
            <Col>
              <h5>Event Location</h5>
              <p className="text-muted">Online - Zoom Platform</p>
            </Col>
          </Row>

          {/* Is There a Cost Involved */}
          <Row className="mb-3">
            <Col>
              <h5>Is there a cost involved?</h5>
              <p className="text-muted">Yes</p>
            </Col>
          </Row>

          {/* Attachments */}
          <Row className="mb-3">
            <Col>
              <h5>Attachments</h5>
              <a href="#" className="text-primary">
                Project Brochure.pdf
              </a>
            </Col>
          </Row>

          {/* Banner Section */}
          <Row className="mb-4">
            <Col>
              <img
                src="https://via.placeholder.com/600x200"
                alt="Ad/Content"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>

          {/* Get Started Button */}
          <Row className="justify-content-end">
            <Col xs="auto">
              <Button variant="primary" className="px-5">
                Get Started
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProjectDetailsCard;
