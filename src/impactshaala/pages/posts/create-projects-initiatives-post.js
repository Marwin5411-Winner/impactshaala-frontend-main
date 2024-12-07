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
import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import WarningPopup from "../../../components/WarningPopup";

import "../index.css";

import Step1 from "./createProject/step-1";
import Step2 from "./createProject/step-2";
import Step3 from "./createProject/step-3";
import PreviewSubmit from "./createProject/previewSubmit";

const post1 = ["Education", "Social Impact", "Live Events", "Others"];

// Main Component
function CreateProjectsInitiativesPost() {
  const [step, setStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: "",
    lookingFor: "",
    category: "",
    subcategory: "",
    subType: "",
    keyword: "",
    specificKeyword: "",
    postTitle: "",
    targetAudienceOffer: "",
    targetAudienceSeek: "",
    goal: "",
    eventRecurringType: "",
    eventStartDatetime: new Date(), // Initialize with current date
    eventEndDatetime: new Date(), // Initialize with current date
    recurringEvents: [{ startDateTime: "", endDateTime: "" }], // Initialize with one recurring event
    recurringStartTime: "",
    recurringEndTime: "",
    eventType: "",
    communicationLanguage: "",
    otherLanguage: "",
    OpportunityServiceType: "",
    postType: "",
    costInvolved: "",
    eligibility: "",
    additional: "",
    attachment: null,
    whoView: "",
    terms: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowWarning(true);
    console.log(formData);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <h3>Create a Opportunity/Services Post</h3>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <Step1
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        setFormData={setFormData}
                      />
                    )}
                    {step === 2 && (
                      <Step2
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        post1={post1}
                        setFormData={setFormData}
                      />
                    )}
                    {step === 3 && (
                      <Step3
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                      />
                    )}
                    {step === 4 && (
                      <PreviewSubmit
                        formData={formData}
                        prevStep={prevStep}
                        handleSubmit={handleSubmit}
                      />
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <WarningPopup show={showWarning} close={() => setShowWarning(false)} />
    </div>
  );
}

export default CreateProjectsInitiativesPost;
