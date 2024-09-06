import React, { useState } from 'react';
import { Col, Card, Container, Row, Image, Form, Button, InputGroup, FormSelect, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { BsEyeSlash, BsEye, BsPlus, BsDash } from 'react-icons/bs';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../components/partials/dashboard/SidebarStyle/sidebar';
import WYSWYGEditor from '../../../components/WYSWYGEditor';

import "../index.css"
import WarningPopup from '../../../components/WarningPopup';

function CreateProjectsInitiativesPost() {
  const [showWarning, setShowWarning] = useState(false)
  const [show, AccountShow] = useState('A');
  const [formData, setFormData] = useState({
    projectTitle: '',
    collaborateWith: '',
    governmentSector: false,
    privateSector: false,
    govtEducationalInstitution: false,
    privateEducationalInstitution: false,
    provideReceive: [],
    objective: '',
    projectTenure: '',
    projectDescription: '',
    beneficiaries: '',
    projectLanguage: [],
    startDate: '',
    endDate: '',
    serviceSchedule: [],
    location: '',
    projectAddress: '',
    serviceType: '',
    paymentRange: {
      minAmount: '',
      maxAmount: ''
    },
    specialNote: '',
    attachment: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowWarning(true)
    console.log(formData);
  };

  const data = [
    {
        value: 1,
        label: "select-1"
    },
    {
        value: 2,
        label: "select-2"
    },
    {
        value: 3,
        label: "select-3"
    },
    {
        value: 4,
        label: "select-4"
    },
    {
        value: 5,
        label: "select-5"
    },
    {
        value: 6,
        label: "select-6"
    },
    {
        value: 7,
        label: "select-7"
    },
    {
        value: 8,
        label: "select-8"
    }
];

const [rows, setRows] = useState([{ date: '', startTime: '', endTime: '' }]);

    // set value for default selection
    const [selectedValue, setSelectedValue] = useState([]);
    const [t_and_c, set_T_And_C] = useState(false)
    // handle onChange event of the dropdown
    const handleLookingToProvideReceive = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleAddRow = () => {
      setRows([...rows, { date: '', startTime: '', endTime: '' }]);
    };
  
    const handleRemoveRow = (index) => {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    };
  
    const handleFormRepeaterChange = (index, e) => {
      const { name, value } = e.target;
      const updatedRows = [...rows];
      updatedRows[index][name] = value;
      setRows(updatedRows);
    };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Row>
            <Col>
              <div>
                <Row>
                  <Col sm="12" lg="12">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <h3 className="">
                          Create post /{" "}
                          <span style={{ color: "#FCBF49" }}>
                            <small>Create a project & initiatives post</small>
                          </span>
                        </h3>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md="6">
                            <Form.Group controlId="collaborateWith">
                              <Form.Label>Create a collaboration of type</Form.Label>
                              <FormSelect name="collaborateWith">
                                <option value="" disabled selected>
                                  Select collaboration type
                                </option>
                                <option value="educationalInstitutions">
                                  Educational Project
                                </option>
                                <option value="NonEducationalInstitutions">
                                  Social Impact Project
                                </option>
                                {/* Add other options as needed */}
                              </FormSelect>
                            </Form.Group>
                          </Col>
                          <Col md="12" className="mt-3">
                            <Form id="form-wizard3" className="text-start">
                              <div className="form-card text-left">
                           
                                <Row>
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>Project title</Form.Label>
                                      <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Title of the project is..."
                                      />
                                    </Form.Group>
                                  </Col>
                                  {/* <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>Who do you want to collaborate With</Form.Label>
                                      <FormSelect name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select the stakeholder type
                                        </option>
                                        <option value="educationalInstitutions">
                                          Educational Institution
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Non Educational Institution
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Educational & Entertainment Venues
                                        </option>
                                      </FormSelect>
                                    </Form.Group>
                                  </Col> */}
                                  <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>Who do you want to collaborate With</Form.Label>
                                      <FormSelect name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select the stakeholder type
                                        </option>
                                        <option value="Students">
                                          Students
                                        </option>
                                        <option value="WorkingProfessionals">
                                          Working Professionals
                                        </option>
                                        <option value="NonGovernmentalOrganizations">
                                          Non Governmental Organizations
                                        </option>
                                        <option value="Corporates">
                                          Corporates
                                        </option>
                                        <option value="EducationalInstitutions">
                                          Educational Institutions
                                        </option>
                                        <option value="Others">
                                          Others
                                        </option>
                                        {/* Add other options as needed */}
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  {
                                    formData.collaborateWith == "Others" && (
                                      <Col md="6">
                                        <Form.Group className="form-group">
                                          <Form.Label>Collaborate with </Form.Label>
                                          <Form.Control
                                            type="text"
                                            id="others"
                                            name="others"
                                            placeholder="Enter your collaboration"
                                          />
                                        </Form.Group>
                                      </Col>
                                    )
                                  }
                                  <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>
                                        Select the stakeholders
                                      </Form.Label>
                                      <FormSelect name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select Stakeholder
                                        </option>
                                        <option value="GovtSectorOrg">
                                          Government sector organization
                                        </option>
                                        <option value="GovtSectorOrg">
                                          Private sector organization
                                        </option>
                                        <option value="GovtSectorOrg">
                                          Government educational institution
                                        </option>
                                        <option value="GovtSectorOrg">
                                          Private educational institution
                                        </option>
                                        <option value="GovtSectorOrg">
                                          Educational exhibition organizers
                                        </option>
                                        {/* Add other options as needed */}
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
                                    <Form.Group className="form-group mt-2">
                                      <Form.Label htmlFor="exampleFormControlSelect2">
                                        Looking to provide
                                      </Form.Label>
                                      <Select
                                        className="dropdown"
                                        placeholder="Select upto 5 keywords"
                                        value={data.filter((obj) =>
                                          selectedValue.includes(obj.value)
                                        )} // set selected values
                                        options={data} // set list of the data
                                        onChange={handleLookingToProvideReceive} // assign onChange function
                                        isMulti
                                        isClearable
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
                                    <Form.Group className="form-group mt-2">
                                      <Form.Label htmlFor="exampleFormControlSelect2">
                                        Looking to receive
                                      </Form.Label>
                                      <Select
                                        className="dropdown"
                                        placeholder="Select upto 5 keywords"
                                        value={data.filter((obj) =>
                                          selectedValue.includes(obj.value)
                                        )} // set selected values
                                        options={data} // set list of the data
                                        onChange={handleLookingToProvideReceive} // assign onChange function
                                        isMulti
                                        isClearable
                                      />
                                    </Form.Group>
                                  </Col>
                                  
                                 
                                  <Col md="6">
                                    <Form.Group className="form-group mt-2">
                                      <Form.Label htmlFor="exampleFormControlSelect2">
                                        Let us know your language preferences
                                      </Form.Label>
                                      <Select
                                        className="dropdown"
                                        placeholder="Select as many languages as you want"
                                        value={data.filter((obj) =>
                                          selectedValue.includes(obj.value)
                                        )} // set selected values
                                        options={data} // set list of the data
                                        onChange={handleLookingToProvideReceive} // assign onChange function
                                        isMulti
                                        isClearable
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>
                                        Project tenure in terms of months
                                      </Form.Label>
                                      <FormSelect className='mt-2 pb-2' name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select the project tenure
                                        </option>
                                        <option value="educationalInstitutions">
                                          Micro project (1 to 3 days)
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Week long project (4 to 7 days)
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Quaterly projects (3 months)
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Semester projects (4 to 6 months)
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Year long projects (12 months)
                                        </option>
                                        {/* Add other options as needed */}
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Objective of the collaboration
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="objectiveOfCollaboration"
                                        name="city"
                                        placeholder="My objectives are ..."
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Outcomes of project
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="objectiveOfCollaboration"
                                        name="city"
                                        placeholder="Specific outcomes the project needs to achieve"
                                      />
                                    </Form.Group>
                                  </Col>
                                  
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Project description
                                      </Form.Label>
                                      <WYSWYGEditor />
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Who are the benefiriaries and what will
                                        they gain ?
                                      </Form.Label>
                                      <WYSWYGEditor />
                                    </Form.Group>
                                  </Col>
                                  <Col md="3">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Tentative project start date
                                      </Form.Label>
                                      <Form.Control
                                        type="date"
                                        defaultValue="2019-12-18"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="3">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Tentative project end date (optional)
                                      </Form.Label>
                                      <Form.Control
                                        type="date"
                                        defaultValue="2019-12-18"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="3">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>Location type</Form.Label>
                                      <FormSelect name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select the location type
                                        </option>
                                        <option value="educationalInstitutions">
                                          Onsite
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Virtual
                                        </option>
                                        {/* Add other options as needed */}
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="3">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>Service type</Form.Label>
                                      <FormSelect name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select the service type
                                        </option>
                                        <option value="educationalInstitutions">
                                          Free
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Paid
                                        </option>
                                        {/* Add other options as needed */}
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Physical address of your project
                                      </Form.Label>
                                      <Form.Control
                                        as="textarea"
                                        id="objectiveOfCollaboration"
                                        name="city"
                                        placeholder="#13, Khateja Apt, Bengaluru, India."
                                      />
                                    </Form.Group>
                                  </Col>
                                  {/* You must ask what is frequency of the event */}
                                  <Col md="12">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>Does this event repeats ?</Form.Label>
                                      <FormSelect name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select the event type
                                        </option>
                                        <option value="educationalInstitutions">
                                          Yes, it repeats
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          No, it's a one time event
                                        </option>
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
                                    <div>
                                      <Form.Group controlId="collaborateWith">
                                        <Form.Label>Provide specific dates or days</Form.Label>
                                        {/* CHATGPT, I NEED A FORM REPEATER WITH ADD BUTTON TO ADD A ROW. I ALSO NEED A REMOVE BUTTON TO REMOVE A ADDED ROW. THE FORM REPEATER CONTAINS, TEXT FIELD CALLED DATE/DAY, TIME FIELD CALLED STARTING TIME, AND ANOTHER TIME FIELD CALLED CLOSING TIME */}
                                        {rows.map((row, index) => (
                                          <Row key={index} className="mb-3">
                                            <Col md="4">
                                              <Form.Control
                                                type="text"
                                                name="dateorday"
                                                placeholder='Every Monday'
                                                value={row.date}
                                                onChange={(e) => handleFormRepeaterChange(index, e)}
                                              />
                                            </Col>
                                            <Col md="4">
                                              <Form.Control
                                                type="time"
                                                name="startTime"
                                                value={row.startTime}
                                                onChange={(e) => handleFormRepeaterChange(index, e)}
                                              />
                                            </Col>
                                            <Col md="3">
                                              <Form.Control
                                                type="time"
                                                name="endTime"
                                                value={row.endTime}
                                                onChange={(e) => handleFormRepeaterChange(index, e)}
                                              />
                                            </Col>
                                            <Col md="1">
                                              {index === rows.length - 1 ? (
                                                <Button variant="primary" onClick={handleAddRow}><BsPlus /></Button>
                                              ) : (
                                                <Button variant="outline-danger" onClick={() => handleRemoveRow(index)}><BsDash /></Button>
                                              )}
                                            </Col>
                                          </Row>
                                        ))}
                                      </Form.Group>
                                    </div>
                                  </Col>
                                
                                  <Col md="3">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Mention service price range in ₹
                                      </Form.Label>
                                      <Row>
                                        <Col>
                                          <Form.Control
                                            type="number"
                                            placeholder="Min price"
                                          />
                                        </Col>
                                        <Col>
                                          <Form.Control
                                            type="number"
                                            placeholder="Max price"
                                          />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Col>
                                  <Col md="9">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Special Notes (optional)
                                      </Form.Label>
                                      <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email Id"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Attachment (optional, you can upload any file of the following formats: .png, .jpeg, .jpg, .pdf, .mp4)
                                      </Form.Label>
                                      <Form.Control
                                        type="file"
                                        name="attachments"
                                        accept=""
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Col md="12">
																	<Form.Group className="form-group position-relative">
																		<Form.Check 
																			type="checkbox"
																			checked={t_and_c}
																			onChange={() => set_T_And_C(state => !state)}
																			id="accept_t_and_c_checkbox"
																			
																			/>
																			<Form.Label for="accept_t_and_c_checkbox" style={{position: "absolute", top: "0px", left: "20px"}}>
																				Accept Terms & Conditions
																			</Form.Label>
                                  </Form.Group>
																</Col> 
                                <button className="mt-1 punchred-button" style={{filter: t_and_c?"grayscale(0%)": "grayscale(100%)", cursor: t_and_c?"default":"not-allowed"}}  type="button" onClick={handleSubmit} disabled={!t_and_c}>
                                  Post the requirement
                                </button>
                              </div>
                            </Form>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
			<WarningPopup show={showWarning} close={() => setShowWarning(false)} />
    </div>
  );
}

export default CreateProjectsInitiativesPost;