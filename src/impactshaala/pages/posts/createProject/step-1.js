import React from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormSelect,
  FormControl,
} from "react-bootstrap";

import categories from "./categories.json";

// Step 1 Component
function Step1({ formData, handleChange, nextStep, setFormData }) {
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
      subcategory: "",
      subType: "",
      keyword: "",
    });
  };

  const handleSubcategoryChange = (e) => {
    setFormData({
      ...formData,
      subcategory: e.target.value,
      subType: "",
      keyword: "",
    });
  };

  const handleSubtypeChange = (e) => {
    const selectedSubcategory = categories
      .find((cat) => cat.category === formData.category)
      ?.subcategories.find((subcat) => subcat.name === formData.subcategory);

    const selectedSubtype = selectedSubcategory?.subtypes.find(
      (subtype) => subtype.name === e.target.value
    );

    setFormData({
      ...formData,
      subType: e.target.value,
      keyword: selectedSubtype ? selectedSubtype.keyword : "",
    });
  };

  const handleOtherSubcategoryChange = (e) => {
    setFormData({
      ...formData,
      subcategoryOther: e.target.value,
    });
  };

  const handleOtherSubtypeChange = (e) => {
    setFormData({
      ...formData,
      subTypeOther: e.target.value,
    });
  };

  // Get selected category object
  const selectedCategory = categories.find(
    (cat) => cat.category === formData.category
  );

  // Get selected subcategory object
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (subcat) => subcat.name === formData.subcategory
  );

  return (
    <div>
      {/* Section 1: General Information */}
      <h4>1 of 3: General Information</h4>
      <p>
        Provide the basic details about your post to help categorize and
        identify it.
      </p>

      {/* Looking For */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Select what you are looking for
        </Form.Label>
        <Col sm={9}>
          <FormSelect
            name="lookingFor"
            value={formData.lookingFor}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="offer">I am looking to offer</option>
            <option value="seek">I am looking to seek</option>
          </FormSelect>
        </Col>
      </Form.Group>

      {/* Conditionally render Opportunity or Service based on lookingFor value */}
      {formData.lookingFor && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Opportunity or Service
          </Form.Label>
          <Col sm={9}>
            <FormSelect
              name="opportunityService"
              value={formData.opportunityService}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Service">Service</option>
            </FormSelect>
          </Col>
        </Form.Group>
      )}
      {/* Category */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Select a category that best describes your post
        </Form.Label>
        <Col sm={9}>
          <FormSelect
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Choose...</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </FormSelect>
        </Col>
      </Form.Group>

      {/* Subcategory */}
      {formData.category && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Select a subcategory
          </Form.Label>
          <Col sm={9}>
            <FormSelect
              name="subcategory"
              value={formData.subcategory}
              onChange={handleSubcategoryChange}
            >
              <option value="">Choose...</option>
              {selectedCategory?.subcategories.map((subcat, index) => (
                <option key={index} value={subcat.name}>
                  {subcat.name}
                </option>
              ))}
            </FormSelect>
          </Col>
        </Form.Group>
      )}

      {/* Other Subcategory Input */}
      {formData.subcategory === "Others" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Enter custom subcategory
          </Form.Label>
          <Col sm={9}>
            <FormControl
              type="text"
              placeholder="Type your custom subcategory"
              value={formData.subcategoryOther || ""}
              onChange={handleOtherSubcategoryChange}
            />
          </Col>
        </Form.Group>
      )}

      {/* Subtype */}
      {formData.subcategory && formData.subcategory !== "Others" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Select a subtype
          </Form.Label>
          <Col sm={9}>
            <FormSelect
              name="subType"
              value={formData.subType}
              onChange={handleSubtypeChange}
            >
              <option value="">Choose...</option>
              {selectedSubcategory?.subtypes.map((subtype, index) => (
                <option key={index} value={subtype.name}>
                  {subtype.name}
                </option>
              ))}
            </FormSelect>
          </Col>
        </Form.Group>
      )}

      {/* Other Subtype Input */}
      {formData.subType === "Others" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Enter custom subtype
          </Form.Label>
          <Col sm={9}>
            <FormControl
              type="text"
              placeholder="Type your custom subtype"
              value={formData.subTypeOther || ""}
              onChange={handleOtherSubtypeChange}
            />
          </Col>
        </Form.Group>
      )}

      {/* Display Keyword */}
      {formData.subType && formData.subType !== "Others" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Keyword Description
          </Form.Label>
          <Col sm={9}>
            <p>{formData.keyword}</p>
          </Col>
        </Form.Group>
      )}

      {/* Specify Keyword */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Clearly specify the selected keyword furthur to give more clarify
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            name="specificKeyword"
            placeholder="XYZ Keyword"
            value={formData.specificKeyword}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Button
        variant="primary"
        onClick={nextStep}
        disabled={!formData.lookingFor}
      >
        Next
      </Button>
    </div>
  );
}

export default Step1;
