import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Header from '../../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../../components/partials/dashboard/SidebarStyle/sidebar';
import { createAccomplishment } from '../../../../api/accomplishments';

const AccomplishmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    validationFile: null,
    projectTitle: '',
    collaborations: '',
    startDate: '',
    endDate: '',
    primaryObjective: '',
    keyDeliverables: '',
    approach: '',
    activities: '',
    challenges: '',
    educationalImpact: '',
    innovativeApproach: '',
    impactLevel: '',
    lastingImpact: '',
    projectAdequacy: '',
    achievements: '',
    testimonials: '',
    images: [],
    videos: [],
    documents: [],
    profilePic: '',
  });
  const [submitError, setSubmitError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const { name } = e.target;
  
    if (!files.length) return;
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: [...prevData[name], reader.result],
        }));
      };
    });
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to be sent
      const accomplishmentData = {
        ...formData,
        validationFile: formData.validationFile,
        images: formData.images,
        videos: formData.videos,
        documents: formData.documents,
      };

      // Send request to the API to create the accomplishment
      const resp = await createAccomplishment(accomplishmentData);

      // Check if the response was successful
      if (resp.data.success) {
        window.alert('Successfully submitted accomplishment');
        setFormData({
          title: '',
          description: '',
          validationFile: null,
          projectTitle: '',
          collaborations: '',
          startDate: '',
          endDate: '',
          primaryObjective: '',
          keyDeliverables: '',
          approach: '',
          activities: '',
          challenges: '',
          educationalImpact: '',
          innovativeApproach: '',
          impactLevel: '',
          lastingImpact: '',
          projectAdequacy: '',
          achievements: '',
          testimonials: '',
          images: [],
          videos: [],
          documents: [],
          profilePic: '',
        });
        setSubmitError('');
      } else {
        // If the backend returns an error message, set the error message for the user
        setSubmitError(resp.data.message || 'Failed to submit accomplishment');
      }
    } catch (err) {
      // Handle any client-side or network errors
      if (err && err.response && err.response.data && err.response.data.message)
        setSubmitError(err.response.data.message);
      else setSubmitError('An error occurred while submitting the accomplishment.');
      console.error(err);
    }
  };

  return (
    <div>
      {/* Header */}
      <Header />
      <Sidebar />

      {/* Main content */}
      <div>
        {/* Accomplishment Form */}
        <Container className="mt-5 main-section">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col xs={12}>
                <h4>Project Title</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter project title"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Collaborations</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter collaborations"
                    name="collaborations"
                    value={formData.collaborations}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={6}>
                <h4>Start Date</h4>
                <Form.Group>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <h4>End Date</h4>
                <Form.Group>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Primary Objective</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter primary objective"
                    name="primaryObjective"
                    value={formData.primaryObjective}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Key Deliverables</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter key deliverables"
                    name="keyDeliverables"
                    value={formData.keyDeliverables}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Approach</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter approach"
                    name="approach"
                    value={formData.approach}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Activities</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter activities"
                    name="activities"
                    value={formData.activities}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Challenges</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter challenges"
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Educational Impact</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter educational impact"
                    name="educationalImpact"
                    value={formData.educationalImpact}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Innovative Approach</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter innovative approach"
                    name="innovativeApproach"
                    value={formData.innovativeApproach}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Impact Level</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter impact level"
                    name="impactLevel"
                    value={formData.impactLevel}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Lasting Impact</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter lasting impact"
                    name="lastingImpact"
                    value={formData.lastingImpact}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Project Adequacy</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter project adequacy"
                    name="projectAdequacy"
                    value={formData.projectAdequacy}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Achievements</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12}>
                <h4>Testimonials</h4>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Enter testimonials"
                    name="testimonials"
                    value={formData.testimonials}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12} md={4}>
                <h4>Attach Images</h4>
                <Form.Group>
                  <Form.Control type="file" name="images" onChange={handleFileChange} multiple />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12} md={4}>
                <h4>Attach Videos</h4>
                <Form.Group>
                  <Form.Control type="file" name="videos" onChange={handleFileChange} multiple />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={12} md={4}>
                <h4>Attach Documents</h4>
                <Form.Group>
                  <Form.Control type="file" name="documents" onChange={handleFileChange} multiple />
                </Form.Group>
              </Col>
            </Row>

            {submitError && (
              <Row className="mb-4">
                <Col xs={12}>
                  <p className="text-danger">{submitError}</p>
                </Col>
              </Row>
            )}

            {/* Submit Button */}
            <Row className="text-center">
              <Col>
                <Button variant="primary" type="submit">
                  Submit Accomplishment
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Preview Block */}
          <Card className="mt-5">
            <Card.Header>Preview of Accomplishment</Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col xs={12}>
                  <h5>Title of Accomplishment</h5>
                  <p>{formData.title || 'No title provided'}</p>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={12}>
                  <h5>Description of Achievement</h5>
                  <p>{formData.description || 'No description provided'}</p>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={12} md={4}>
                  <h5>Validation</h5>
                  <p>{formData.validationFile ? formData.validationFile.name : 'No file uploaded'}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AccomplishmentForm;