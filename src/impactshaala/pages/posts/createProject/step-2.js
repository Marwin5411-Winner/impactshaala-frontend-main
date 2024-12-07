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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// Step 2 Component
function Step2({
  formData,
  handleChange,
  nextStep,
  prevStep,
  post1,
  setFormData,
}) {
  // Handle date and time changes for recurring events
  const handleRecurringDateTimeChange = (index, field, value) => {
    const newRecurringEvents = [...formData.recurringEvents];
    newRecurringEvents[index][field] = value;
    setFormData({
      ...formData,
      recurringEvents: newRecurringEvents,
    });
  };

  // Add a new recurring event input
  const addRecurringEvent = () => {
    setFormData({
      ...formData,
      recurringEvents: [
        ...formData.recurringEvents,
        { startDateTime: "", endDateTime: "" },
      ],
    });
  };

  // Handle start and end date/time changes for One Time Event
  const handleDateTimeChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  // Remove a recurring event input
  const removeRecurringEvent = (index) => {
    const newRecurringEvents = [...formData.recurringEvents];
    newRecurringEvents.splice(index, 1);
    setFormData({
      ...formData,
      recurringEvents: newRecurringEvents,
    });
  };

  return (
    <div>
      {/* Section 2: Post Details */}
      <h4>2 of 3: Post Details</h4>
      <p>Fill in the specific details to clearly describe your post.</p>

      {/* Post Title */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Provide a clear and concise title for your post
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            name="postTitle"
            value={formData.postTitle}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      {formData.lookingFor && formData.opportunityService ? (
        formData.lookingFor === "offer" ? (
          <>
            {/* Target Audience Offer */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                {post1.includes(formData.category)
                  ? "Select and describe the target audience for who you aim to offer this " +
                    formData.opportunityService
                  : "Describe the target audience from who you aim to offer this " +
                    formData.opportunityService}
              </Form.Label>
              <Col sm={9}>
                <FormSelect
                  name="targetAudienceOffer"
                  value={formData.targetAudienceOffer}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="Students">Students</option>
                  {post1.includes(formData.category) ? (
                    <option value="Educational Institutions">
                      Educational Institutions
                    </option>
                  ) : (
                    <option value="Working Professionals">
                      Working Professionals
                    </option>
                  )}
                  <option value="Others">Others</option>
                </FormSelect>
              </Col>
            </Form.Group>

            {/* Conditionally render input field for "Others" */}
            {formData.targetAudienceOffer && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Specify Target Audience
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="specifyTargetAudience"
                    placeholder="Enter target audience"
                    value={formData.specifyTargetAudience || ""}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            )}
          </>
        ) : (
          // Target Audience Seek
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              {"Describe the target audience from whom you aim to " +
                formData.lookingFor +
                " this " +
                formData.opportunityService}
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="targetAudienceSeek"
                placeholder="Describe the target audience"
                value={formData.targetAudienceSeek || ""}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        )
      ) : null}

      {/* Goal */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          {"Mention your goal for " +
            formData.lookingFor +
            " this " +
            formData.opportunityService}
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      {/* Event Type */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Event Type
        </Form.Label>
        <Col sm={9}>
          <FormSelect
            name="eventRecurringType"
            value={formData.eventRecurringType}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="One Time Event">One Time Event</option>
            <option value="Recurring Event">Recurring Event</option>
          </FormSelect>
        </Col>
      </Form.Group>

      {/* Conditional Date Input Fields Based on Event Type */}
      {formData.eventRecurringType === "One Time Event" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Event Start Date & Time
          </Form.Label>
          <Col sm={9}>
            <DatePicker
              selected={formData.eventStartDatetime}
              onChange={(date) =>
                handleDateTimeChange("eventStartDatetime", date)
              }
              showTimeSelect
              dateFormat="Pp"
            />
          </Col>

          <Form.Label column sm={3} className="mt-3">
            Event End Date & Time
          </Form.Label>
          <Col sm={9} className="mt-3">
            <DatePicker
              selected={formData.eventEndDatetime}
              onChange={(date) =>
                handleDateTimeChange("eventEndDatetime", date)
              }
              showTimeSelect
              dateFormat="Pp"
            />
          </Col>
        </Form.Group>
      )}

      {/* Recurring Event */}
      {formData.eventRecurringType === "Recurring Event" && (
        <>
          {formData.recurringEvents.map((event, index) => (
            <Form.Group as={Row} className="mb-3" key={index}>
              <Form.Label column sm={3}>
                Date {index + 1}
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type="datetime-local"
                  name="startDateTime"
                  value={event.startDateTime}
                  onChange={(e) =>
                    handleRecurringDateTimeChange(
                      index,
                      "startDateTime",
                      e.target.value
                    )
                  }
                  placeholder="Start Date & Time"
                />
              </Col>
              <Col sm={4}>
                <Form.Control
                  type="datetime-local"
                  name="endDateTime"
                  value={event.endDateTime}
                  onChange={(e) =>
                    handleRecurringDateTimeChange(
                      index,
                      "endDateTime",
                      e.target.value
                    )
                  }
                  placeholder="End Date & Time"
                />
              </Col>
              <Col sm={1} className="d-flex align-items-center">
                <Button variant="primary" onClick={addRecurringEvent}>
                  +
                </Button>
                {formData.recurringEvents.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => removeRecurringEvent(index)}
                  >
                    -
                  </Button>
                )}
              </Col>
            </Form.Group>
          ))}
        </>
      )}

      {/* Communication Language */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Communication Language
        </Form.Label>
        <Col sm={9}>
          <FormSelect
            name="communicationLanguage"
            value={formData.communicationLanguage}
            onChange={handleChange}
          >
            <option disabled value="">
              Choose...
            </option>
            <option value="English">English</option>
            <option value="Kannada">Kannada</option>
            <option value="Hindi">Hindi</option>
            <option value="Others">Others</option>
            <option value="Not Applicable">Not Applicable</option>
          </FormSelect>
        </Col>
      </Form.Group>

      {/* Input field for "Others" */}
      {formData.communicationLanguage === "Others" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Specify Other Language
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="otherLanguage"
              placeholder="Enter language"
              value={formData.otherLanguage}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
      )}

      {/* Mention the opportunity/service type */}

      {/* TODO: NOTE That WHen user Select Remote then Show a Information that tell user to provide detail in Descriotion  */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Mention the {formData.opportunityService} type
        </Form.Label>
        <Col sm={9}>
          <FormSelect
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
          >
            <option disabled value="">
              Choose...
            </option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Others">Remote</option>
          </FormSelect>
        </Col>
      </Form.Group>

      {/* Cost Involved */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Is there a cost involved? (If applicable)
        </Form.Label>
        <Col sm={9}>
          <FormSelect
            name="costInvolved"
            value={formData.costInvolved}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </FormSelect>
        </Col>
      </Form.Group>

      {/* Conditional Amount Input */}
      {formData.costInvolved === "Yes" && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Mention the cost
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="costAmount"
              value={formData.costAmount}
              onChange={handleChange}
              placeholder="Enter the amount"
            />
          </Col>
        </Form.Group>
      )}

      {/* Eligibility */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
        Mention the Eligibility Criteria (if applicable)
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      {/* Attachment */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Upload any relevant attachments
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="file" name="attachment" onChange={handleChange} />
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

export default Step2;
