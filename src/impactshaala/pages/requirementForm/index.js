import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";

function RequirementForm() {
  const [formData, setFormData] = useState({
    urgency: "",
    needBy: "",
    category: "",
    otherCategory: "",
    details: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
    bestTime: "",
    attachment: null,
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data
    console.log(formData);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Form onSubmit={handleSubmit}>
            <h3 className="mb-4">
              Please fill in the details below to share your requirement with
              us. Our team will review your request and get in touch with you
              shortly.
            </h3>

            {/* Urgency Level */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Indicate the urgency level of your requirement
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  name="urgency"
                  value={formData.urgency} // Assuming formData contains the form state
                  onChange={handleChange}
                >
                  <option value="">Select urgency level</option>{" "}
                  {/* Default placeholder option */}
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Control>
              </Col>
            </Form.Group>

            {/* Need By */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                When do you need the resource/service by
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  name="needBy"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Category */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Choose the main category that best describes your requirement
              </Form.Label>
              <Col sm={9}>
                <Form.Check
                  type="radio"
                  label="Educational Projects"
                  name="category"
                  value="Educational Projects"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Social Impact Initiatives"
                  name="category"
                  value="Social Impact Initiatives"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Career Advancement Opportunities"
                  name="category"
                  value="Career Advancement Opportunities"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Live Events"
                  name="category"
                  value="Live Events"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Business Networking & Grants"
                  name="category"
                  value="Business Networking & Grants"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Passion"
                  name="category"
                  value="Passion"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Others"
                  name="category"
                  value="Others"
                  onChange={handleChange}
                />
                {formData.category === "Others" && (
                  <Form.Control
                    type="text"
                    placeholder="Please specify"
                    name="otherCategory"
                    className="mt-2"
                    onChange={handleChange}
                  />
                )}
              </Col>
            </Form.Group>

            {/* Detailed Information */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Provide detailed information about your requirement
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="details"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Budget Range */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Mention your budget range
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="budget"
                  placeholder="Enter your budget range"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Contact Details */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Provide your contact details so we can reach out to you
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="mb-2"
                />
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="mb-2"
                />
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
            </Form.Group>

            {/* Preferred Method of Contact */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Select your preferred method of contact
              </Form.Label>
              <Col sm={9}>
                <Form.Check
                  type="radio"
                  label="Email"
                  name="contactMethod"
                  value="Email"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Phone number"
                  name="contactMethod"
                  value="Phone number"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Best Time to Contact */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Indicate the best time for us to reach out to you
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="bestTime"
                  placeholder="E.g., 9 AM - 5 PM"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Add Attachment */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Add Attachment
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="file"
                  name="attachment"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Consent */}
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 9, offset: 3 }}>
                <Form.Check
                  type="checkbox"
                  label="I consent to Impactshaala contacting me using the information provided above for the purpose of assisting with my service request."
                  name="consent"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-center">
            <p className="mt-5 ">Already have this project posted on platform? Click <a className="link-primary" href="">here</a> to Share with us the same</p>
            </div>

            

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>


            <div className="d-flex justify-content-center bg-primary text-white mt-5">
              <p className="mt-3">Our Team will review your request and Get in touch with you as soon as possible. Thank you for reaching out to Impactshaala</p>
            </div>


            
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default RequirementForm;
