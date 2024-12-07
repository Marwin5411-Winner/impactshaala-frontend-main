import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { createMyAccomplishment } from "../../../../../api/accomplishments";

const AccomplishmentForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    validationFile: null,
    files: [],
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
    const files = Array.from(e.target.files);
    const { name } = e.target;

    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.isArray(prevData[name])
            ? [...prevData[name], reader.result]
            : [reader.result],
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
      const resp = await createMyAccomplishment(accomplishmentData);

      // Check if the response was successful
      if (resp.data.success) {
        window.alert("Successfully submitted accomplishment");
        setFormData({
          title: "",
          description: "",
          files: [],
        });
      } else {
        // If the backend returns an error message, set the error message for the user
      }
    } catch (err) {
      // Handle any client-side or network errors
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
      } else {
        console.error(err);
      }
    }

    console.log("Form Data Submitted:", formData);
    // Add logic to submit the form data
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Attach Validation Files</Form.Label>
              <Form.Control
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit">Submit</Button>
        <Button className="btn-secondary ml-3" onClick={onCancel}>Cancel</Button>
      </Form>
    </Container>
  );
};

export default AccomplishmentForm;
