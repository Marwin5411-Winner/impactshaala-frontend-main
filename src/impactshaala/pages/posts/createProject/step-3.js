import React, { useState } from "react";
import {
  Col,
  Card,
  Container,
  Row,
  Form,
  Button,
  FormSelect,
} from "react-bootstrap";

// Step 3 Component
function Step3({ formData, handleChange, nextStep, prevStep }) {
    return (
      <div>
        <h4>3 of 3: Additional Information</h4>
        <p>Add any additional relevant details to complete your post.</p>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Add additional details
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={prevStep}>
            Go Back
          </Button>
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </div>
    );
  }

export default Step3;