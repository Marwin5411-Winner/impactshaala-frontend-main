import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../../components/partials/dashboard/SidebarStyle/sidebar";

const CollaborativeAccomplishmentForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    collaborators: "",
    targetAudience: "",
    startDate: "",
    endDate: "",
    location: "",
    projectType: "",
    description: "",
    challenges: "",
    impactStatements: "",
    innovativeApproach: "",
    accomplishments: "",
    supportingDocuments: null,
    futureSteps: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      supportingDocuments: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add logic to handle form submission, e.g., sending data to an API
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Container className="mt-5">
        <h4>Add a Project Accomplishment</h4>
        <Form onSubmit={handleSubmit}>
          {/* Project Title */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="projectTitle">
                <Form.Label>MyCommunity/Services Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter project title"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Collaborators */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="collaborators">
                <Form.Label>Collaborators</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter collaborators"
                  name="collaborators"
                  value={formData.collaborators}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Project Dates */}
          <Row className="mb-3">
            <Col xs={6}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Project Overview */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="description">
                <Form.Label>Opportunity/Services Overview</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe the MyCommunity/Services"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Challenges */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="challenges">
                <Form.Label>Challenges/Obstacles Faced</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe challenges faced during the project"
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Innovative Approach */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="innovativeApproach">
                <Form.Label>Innovative Approach/Solutions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe any innovative solutions used"
                  name="innovativeApproach"
                  value={formData.innovativeApproach}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Accomplishments */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="accomplishments">
                <Form.Label>Significant Accomplishments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe key accomplishments or milestones"
                  name="accomplishments"
                  value={formData.accomplishments}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Supporting Documents */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="supportingDocuments">
                <Form.Label>
                  Attach Supporting Documents (Images/Videos)
                </Form.Label>
                <Form.Control
                  type="file"
                  name="supportingDocuments"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Future Steps */}
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="futureSteps">
                <Form.Label>Future Steps/Follow-Up Actions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe any future steps planned as a result of the project"
                  name="futureSteps"
                  value={formData.futureSteps}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit Project Accomplishment
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CollaborativeAccomplishmentForm;
