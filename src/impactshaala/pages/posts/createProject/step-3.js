import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  Container,
  Row,
  Form,
  Button,
  FormSelect,
} from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Step 3 Component
function Step3({ formData, setFormData, nextStep, prevStep }) {

  const [textValue, setTextValue] = useState("");

  function sendToMainData() {
    setFormData({ ...formData, additional: textValue});
  }

  useEffect(() => {
    sendToMainData();
  }, [textValue])
  
    return (
      <div>
        <h4>3 of 3: Additional Information</h4>
        <p>Add any additional relevant details to complete your post.</p>
        <Form.Group as={Col} className="mb-3">
          <Form.Label column sm={3}>
            Add additional details
          </Form.Label>
          <Col sm={12}>
          <ReactQuill theme="snow" name="additionalDetails" value={textValue} onChange={setTextValue} />

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