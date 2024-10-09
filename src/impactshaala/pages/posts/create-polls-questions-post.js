import React, { useState, useEffect } from "react";
import { Col, Card, Container, Row, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { BsPlus, BsDash } from "react-icons/bs";
import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import { getCollabKeywords } from "../../../api/collaboration";
import { getLocalStorage } from "../../../utilities/localStorage";
import { createPoll } from "../../../api/polls";
import { useNavigate } from "react-router-dom";

function CreatePollsQuestionsPost() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    question: "",
    keywords: [],
    caption: "",
    duration: "1day",
    options: [],
  });
  const [errors, setErrors] = useState({
    question: "",
    caption: "",
    misc: "",
    keywords: "",
    options: ["", "", "", ""],
  });
  const [selected, setSelected] = useState("SUBJECTIVE");


  const labelsForIndividual = [
    "Daily Inspiration",
    "Learnings",
    "Social Impact",
    "Achievement",
    "Interests & Passion",
    "Personal Branding & Goals",
    "Educational Tips & Resources",
    "Hobbies & Leisure Activities",
    "Others",
  ];

  const labelsForOrganization = [
    "Daily Inspiration",
    "Daily Work",
    "Initiatives & Campaigns",
    "Achievement",
    "Social Impact",
    "Educational Tips & Resources",
    "Employee Shoutout & Mentions",
    "Self Promotion & Advertising",
    "Others",
  ];

  const labels =
    user?.accountType === "Individual"
      ? labelsForIndividual
      : labelsForOrganization;

  // set value for default selection

  // handle onChange event of the dropdown
  const handleSelectCollabKeywords = (e) => {
    setFormData((state) => ({
      ...state,
      keywords: Array.isArray(e) ? e.map((x) => x.value) : [],
    }));
    if (e.length > 0 && e.length < 3) {
      setErrors((state) => ({
        ...state,
        keywords: "Please Select Atleast 3 keywords",
      }));
    }
    if (e.length > 5) {
      setErrors((state) => ({
        ...state,
        keywords: "Please Select Only 5 Keywords",
      }));
    }
    if (e.length >= 3 && e.length <= 5) {
      setErrors((state) => ({ ...state, keywords: "" }));
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "question" && e.target.value.length > 150) return;
    if (e.target.name === "question" && e.target.value)
      setErrors((state) => ({ ...state, question: "" }));
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  // Function to handle adding an option
  const handleAddOption = () => {
    if (formData.options.length < 4) {
      setFormData((state) => ({
        ...state,
        options: [...state.options, { label: "", value: "" }],
      }));
    }
  };

  // Function to handle removing an option
  const handleRemoveOption = (index) => {
    setFormData((state) => ({
      ...state,
      options: [
        ...state.options.slice(0, index),
        ...state.options.slice(index + 1),
      ],
    }));
  };

  // Function to handle changing an option
  const handleOptionChange = (value, index) => {
    if (value && value.trim().length !== value.length)
      setErrors((state) => ({
        ...state,
        options: state.options.map((option, ind) =>
          ind === index ? "Please Remove Leading and Trailing Spaces" : option
        ),
      }));
    if ((!!value || value.length === 0) && value.trim().length === value.length)
      setErrors((state) => ({
        ...state,
        options: state.options.map((option, ind) =>
          ind === index ? "" : option
        ),
      }));
    setFormData((state) => ({
      ...state,
      options: [
        ...state.options.slice(0, index),
        { labeL: value, value },
        ...state.options.slice(index + 1),
      ],
    }));
  };

  const fetchCollabKeywords = async () => {
    const resp = await getCollabKeywords();
    if (resp.errRes) {
      if (resp.errRes.response) {
        window.alert(resp.errRes.response.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      console.log(resp);
      return;
    }
    setKeywords(resp.data.data);
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const data = { ...formData };
    data.text = formData.options.map((item) => item.value);

    const emptyIndex = data.text.findIndex((item) => !item.trim());
    if (data.text.length > 0 && emptyIndex !== -1) {
      setErrors((state) => ({
        ...state,
        options: state.options.map((option, index) =>
          emptyIndex === index ? "Enter A Valid Option" : option
        ),
      }));
      return;
    }
    if (!data.question.trim()) {
      setErrors((state) => ({
        ...state,
        question: "Please Enter A Valid Question",
      }));
      return;
    }
    if (data.keywords.length < 3) {
      setErrors((state) => ({
        ...state,
        keywords: "Please Select Atleast 3 Keywords",
      }));
      return;
    }

    const error = Object.keys(errors).find((key) => {
      if (key === "options") return false;
      else return !!errors[key];
    });
    console.log(error);
    if (error) {
      return;
    }

    const resp = await createPoll(data);
    if (resp.errRes) {
      if (resp.errRes.response) {
        setErrors((state) => ({
          ...state,
          misc: resp.errRes.response.data.message,
        }));
        return;
      }
      console.log(resp);
      return;
    }
    if (resp.data.success) {
      navigate("/dashboard/success", {
        state: {
          prompt: resp.data.message,
          path: "/dashboard/app/profile#pills-friends-tab",
        },
      });
    }
  };

  const handleLabelFilter = (e) => {
    setSelectedLabel(e.target.value);
    console.log(`Selected Label: ${e.target.value}`);
  };

  useEffect(() => {
    fetchCollabKeywords();
    const userData = getLocalStorage("user");
    if (userData) {
      setUser(userData);
    } else {
      console.error("No user data found in local storage");
    }
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Card style={{ minHeight: "80vh" }}>
            <Card.Header>
              <h3 className="">
                Create post /{" "}
                <span style={{ color: "#FCBF49" }}>
                  <small>Create Poll Questions</small>
                </span>
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center mt-5">
                <div className="w-75 ">
                  <Row>
                    <Col md="6">
                      <Form.Label>Select your Post Label</Form.Label>
                      <Form.Select
                        aria-label="Label"
                        value={selectedLabel}
                        onChange={handleLabelFilter}
                      >
                        <option value="">Open this select menu</option>
                        {labels.map((label, index) => (
                          <option key={index} value={label}>
                            {label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form id="form-wizard3" className="text-start">
                        <fieldset>
                          <div className=" ">
                            <Row>
                              <Col md="12" className="my-2">
                                <Form.Label> Question Type</Form.Label>
                                <Form.Select
                                  onChange={(e) => {
                                    setSelected(e.target.value);
                                    if (e.target.value === "POLL") {
                                      setFormData((state) => ({
                                        ...state,
                                        options: [{ label: "", value: "" }],
                                      }));
                                    }
                                  }}
                                >
                                  <option value="SUBJECTIVE">
                                    Subjective Question
                                  </option>
                                  <option value="POLL">Poll</option>
                                </Form.Select>
                              </Col>
                              <Col md="12" className="my-2">
                                <Form.Group className="form-group">
                                  <Form.Label>
                                    Mention about your question
                                    <span style={{ color: "red" }}>*</span>{" "}
                                  </Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Enter Question (max 150 words)"
                                    style={{ minHeight: "100px" }}
                                    value={formData.question}
                                    onChange={handleChange}
                                    name="question"
                                  />
                                  {errors.question && (
                                    <p className="text-danger">
                                      {errors.question}
                                    </p>
                                  )}
                                </Form.Group>
                              </Col>
                              {selected === "POLL" && (
                                <>
                                  {formData.options.map((option, index) => (
                                    <Row
                                      key={index}
                                      className="align-items-center"
                                    >
                                      <Col md="11" className="my-2">
                                        <Form.Group className="form-group">
                                          <Form.Label>
                                            Option{" "}
                                            {String.fromCharCode(65 + index)}
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>{" "}
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder={`Enter Option ${String.fromCharCode(
                                              65 + index
                                            )}`}
                                            value={option.label}
                                            onChange={(e) =>
                                              handleOptionChange(
                                                e.target.value,
                                                index
                                              )
                                            }
                                          />
                                          {errors.options[index] && (
                                            <p className="text-danger">
                                              {errors.options[index]}
                                            </p>
                                          )}
                                        </Form.Group>
                                      </Col>
                                      <Col md="1" className="mt-3">
                                        <Button
                                          variant="outline-danger"
                                          onClick={() =>
                                            handleRemoveOption(index)
                                          }
                                        >
                                          <BsDash />
                                        </Button>
                                      </Col>
                                    </Row>
                                  ))}
                                  {formData.options.length < 4 && (
                                    <Col md="12" className="my-2">
                                      <Button
                                        variant="primary"
                                        onClick={handleAddOption}
                                      >
                                        <BsPlus /> Add Option
                                      </Button>
                                    </Col>
                                  )}
                                </>
                              )}
                              <Col md="12" className="my-2">
                                <Form.Group className="form-group">
                                  <Form.Label>
                                    Provide Caption (optional)
                                  </Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Provide a caption"
                                    style={{ minHeight: "50px" }}
                                    onChange={handleChange}
                                    name="caption"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md="12" className="my-2">
                                {/* <Form.Group className="form-group">
                                  <Form.Label>Keywords</Form.Label>
                                  <Select
                                    className="dropdown"
                                    placeholder="Select upto 5 keywords"
                                    value={keywords.filter((obj) => formData.keywords.includes(obj._id)).map(item => ({label: item.collabTag, value: item._id}))} // set selected values
                                    options={keywords.map(item => ({label: item.collabTag, value: item._id}))} // set list of the data
                                    onChange={handleSelectCollabKeywords} // assign onChange function
                                    isMulti
                                    isClearable
                                  />
                                  {
                                    errors.keywords && (
                                      <p className="text-danger">{errors.keywords}</p>
                                    )
                                  }
                                </Form.Group> */}
                                <Col md="12" className="my-2">
                                  <Form.Label>Poll Duration</Form.Label>
                                  <Form.Select
                                    onChange={handleChange}
                                    value={formData.duration}
                                    name="duration"
                                  >
                                    <option value="1day">1 day</option>
                                    <option value="3day">3 days</option>
                                    <option value="1week">1 week</option>
                                    <option value="2week">2 weeks</option>
                                  </Form.Select>
                                </Col>
                              </Col>
                            </Row>
                          </div>
                          {errors.misc && (
                            <p className="text-danger">{errors.misc}</p>
                          )}
                          <button
                            className="mt-1 punchred-button"
                            onClick={handleCreatePoll}
                          >
                            Post Now
                          </button>
                        </fieldset>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default CreatePollsQuestionsPost;
