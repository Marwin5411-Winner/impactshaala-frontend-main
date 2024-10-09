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

// Preview and Submit Component
function PreviewSubmit({ formData, prevStep, handleSubmit }) {
    return (
      <div>
        <h4>Preview and Submit</h4>
        <p>Review your information before submitting.</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={prevStep}>
            Go Back
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    );
  }

export default PreviewSubmit;