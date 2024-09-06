import React, { useState } from 'react';
import { Col, Card, Container, Row, Form, Button, FormSelect } from 'react-bootstrap';
import Select from 'react-select';
import { BsPlus, BsDash } from 'react-icons/bs';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../components/partials/dashboard/SidebarStyle/sidebar';
import WYSWYGEditor from '../../../components/WYSWYGEditor';


const CreateCollab = () => {
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
    // Handle form submission
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

const stakeholders = [
	{
		value: 1,
		label: "Government Sector Organization",
	},
	{
		value: 2,
		label: "Private Sector Organization"
	}
]

const languages = [
	{
		value: 1,
		label: "English"
	},
	{
		value: 2, 
		label: "Kannada"
	},
	{
		value: 3,
		label: "Hindi"
	}
]

const collabKeywords = [
	{
		value: 1,
		label: "English"
	},
	{
		value: 2, 
		label: "Kannada"
	},
	{
		value: 3,
		label: "Hindi"
	}
]

const collaborationMethods = [
	{
		value: 1,
		label: "Online"
	},
	{
		value: 2, 
		label: "Offline"
	},
]

const [rows, setRows] = useState([{ date: '', startTime: '', endTime: '' }]);

    // set value for default selection
    const [selectedValue, setSelectedValue] = useState([]);
		const [selectedStakeHolders, setSelectedStakeHolders] = useState([]);
		const [selectedLanguages, setSelectedLanguages] = useState([])
    const [selectedCollabKeywords, setSelectedCollabKeywords] = useState([])
		const [t_and_c, set_T_And_C] = useState(false)
    const [selectCollabMethods, setSelectCollabMethods] = useState([])
    const [contactType, setContactType] = useState("call")

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

	const handleSelectStakeholder = (e) => {
		setSelectedStakeHolders(Array.isArray(e) ? e.map(x => x.value) : []);	
	}
  
	const handleSelectLanguages = (e) => {
		setSelectedLanguages(Array.isArray(e) ? e.map(x => x.value) : []);	
	}

  const handleSelectCollabKeywords = (e) => {
		setSelectedCollabKeywords(Array.isArray(e) ? e.map(x => x.value) : []);	
	}

  const handleSelectCollaborationMethods = (e) => {
    setSelectCollabMethods(Array.isArray(e) ? e.map(x => x.value) : []);	
  }

  const handleContactTypeChange = (e) => {
    setContactType(e.target.value)
  }

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
                          Collaborate /{" "}
                          <span style={{ color: "#FCBF49" }}>
                            <small>Create a collaboration</small>
                          </span>
                        </h3>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md="12">
                            <Form id="form-wizard3" className="text-start">
                              <div className="form-card text-left">
                                <Row>
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Project description
                                      </Form.Label>
                                      <Form.Control
																				className="mt-2 pb-2"
                                        type="text"
                                        id="objectiveOfCollaboration"
                                        name="city"
                                        placeholder="Provide a brief description of the specific resource or type of collaboration you are looking for."
                                      />
                                      
                                      {/* <WYSWYGEditor placeholder="Provide a brief description of the specific resource or type of collaboration you are looking for."/> */}
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
																		<Form.Group className="form-group mt-2">
                                      <Form.Label htmlFor="exampleFormControlSelect2">
                                        Preferred Method of Collaboration
                                      </Form.Label>
                                      <Select
                                        className="dropdown"
                                        placeholder="Select the stakeholders"
                                        value={collaborationMethods.filter((obj) =>
                                          selectCollabMethods.includes(obj.value)
                                        )} // set selected values
                                        options={collaborationMethods} // set list of the data
                                        onChange={handleSelectCollaborationMethods} // assign onChange function
                                        isMulti
                                        isClearable
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label className="mt-2">Urgency Level</Form.Label>
                                      <FormSelect name="collaborateWith" className="py-2">
                                        <option value="" disabled selected>
                                          Select the urgency level
                                        </option>
                                        <option value="High">
                                          High
                                        </option>
                                        <option value="Medium">
                                          Medium
                                        </option>
                                        <option value="Low">
                                          Low
                                        </option>
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
                                    <Form.Group className="form-group mt-2">
                                      <Form.Label>
                                        Expected Timeframe
                                      </Form.Label>
                                      <Form.Control
																				className="mt-2 pb-2"
                                        type="text"
                                        id="objectiveOfCollaboration"
                                        name="city"
                                        placeholder="When do you need the resource by"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label className="mt-2">Service Type</Form.Label>
                                      <FormSelect name="collaborateWith" className="py-2">
                                        <option value="" disabled selected>
                                          Select the service type
                                        </option>
                                        <option value="Free">
                                          Free
                                        </option>
                                        <option value="Paid">
                                          Paid
                                        </option>
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
                                    <Form.Group className="form-group mt-2">
                                      <Form.Label>
                                        Mention service price range in ₹
                                      </Form.Label>
                                      <Row className="">
                                        <Col>
                                          <Form.Control
                                            className="py-2"
                                            type="number"
                                            placeholder="Min price"
                                          />
                                        </Col>
                                        <Col>
                                          <Form.Control
                                            className="py-2"
                                            type="number"
                                            placeholder="Max price"
                                          />
                                        </Col>
                                      </Row>
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
                                  <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>
                                        Additional Details
                                      </Form.Label>
                                      <Form.Control
                                        as="textarea"
																				className="mt-2 pb-2"
                                        type="text"
                                        id="objectiveOfCollaboration"
                                        name="city"
                                        row={2}
                                        placeholder="Provide any additional content that can help us understand your requirement better."
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="12">
																		<Form.Group className="form-group position-relative">
																			<Form.Check 
																				type="checkbox"
																				checked={t_and_c}
																				onChange={() => set_T_And_C(state => !state)}
																				id="accept_t_and_c_checkbox"
																				
																				/>
																				<Form.Label for="accept_t_and_c_checkbox" style={{position: "absolute", top: "0px", left: "20px"}}>
                                          I consent to impactshaala contacting me using the information provided above for the purpose of assisting with my resource request
																				</Form.Label>
                                    </Form.Group>
																	</Col>
                                  <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label className="mt-2">Preferred method for contacting you</Form.Label>
                                      <FormSelect name="collaborateWith" className="py-2" value={contactType} onChange={handleContactTypeChange}>
                                        <option value="call">
                                          Phone Call
                                        </option>
                                        <option value="email">
                                          Email
                                        </option>
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  {
                                    contactType == "call" ? (
                                      <Col md="6">
                                        <Form.Group className="form-group mt-2">
                                          <Form.Label>
                                            Phone Number
                                          </Form.Label>
                                          <Form.Control
																	    			className="pb-2"
                                            type="number"
                                            id="objectiveOfCollaboration"
                                            name="phoneNo"
                                            placeholder="Provide a brief description of the specific resource or type of collaboration you are looking for."
                                          />
                                        </Form.Group>
                                      </Col>
                                    ): (
                                      <Col md="6">
                                        <Form.Group className="form-group mt-2">
                                          <Form.Label>
                                            Email
                                          </Form.Label>
                                          <Form.Control
																	    			className="pb-2"
                                            type="email"
                                            id="objectiveOfCollaboration"
                                            name="email"
                                            placeholder="Provide a brief description of the specific resource or type of collaboration you are looking for."
                                          />
                                        </Form.Group>
                                      </Col>
                                    )
                                  }
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



                                  {/* Unwanted  */}
                                  {/* <Col md="12">
                                    <Form.Group className="form-group">
                                      <Form.Label>Title</Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="text"
                                        name="text"
                                        placeholder="Title of the collaboration is..."
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label className="mt-2">Who do you want to collaborate With</Form.Label>
                                      <FormSelect name="collaborateWith" className="py-2">
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
                                  </Col>
                                  <Col md="6">
																		<Form.Group className="form-group mt-2">
                                      <Form.Label htmlFor="exampleFormControlSelect2">
                                        Who do you want to collaborate with
                                      </Form.Label>
                                      <Select
                                        className="dropdown"
                                        placeholder="Select the stakeholders"
                                        value={stakeholders.filter((obj) =>
                                          selectedStakeHolders.includes(obj.value)
                                        )} // set selected values
                                        options={stakeholders} // set list of the data
                                        onChange={handleSelectStakeholder} // assign onChange function
                                        isMulti
                                        isClearable
                                      />
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
                                    <Form.Group controlId="collaborateWith">
                                      <Form.Label>
                                        Collaboration Type
                                      </Form.Label>
                                      <FormSelect className='mt-2 pb-2' name="collaborateWith">
                                        <option value="" disabled selected>
                                          Select the type of collaboration
                                        </option>
                                        <option value="educationalInstitutions">
                                          Provide
                                        </option>
                                        <option value="NonEducationalInstitutions">
                                          Receive
                                        </option>
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
                                  <Col md="6">
																		<Form.Group className="form-group">
                                      <Form.Label htmlFor="exampleFormControlSelect2">
																				Collaboration Keywords
                                      </Form.Label>
                                      <Select
                                        className="dropdown mt-2"
                                        placeholder="Select all you are interested in"
                                        value={collabKeywords.filter((obj) =>
                                          selectedCollabKeywords.includes(obj.value)
                                        )} // set selected values
                                        options={collabKeywords} // set list of the data
                                        onChange={handleSelectCollabKeywords} // assign onChange function
                                        isMulti
                                        isClearable
                                      />
                                    </Form.Group>
                                  </Col>
																	<Col md="12">
                                    <Form.Group className="form-group mt-2">
                                      <Form.Label>
                                        Objective of the project
                                      </Form.Label>
                                      <Form.Control
																				className="mt-2 pb-2"
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
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
																	<Col md="6">
																		<Form.Group className="form-group mt-2">
                                      <Form.Label htmlFor="exampleFormControlSelect2">
																				Project Language Preference
                                      </Form.Label>
                                      <Select
                                        className="dropdown"
                                        placeholder="Select all you are interested in"
                                        value={languages.filter((obj) =>
                                          selectedLanguages.includes(obj.value)
                                        )} // set selected values
                                        options={languages} // set list of the data
                                        onChange={handleSelectLanguages} // assign onChange function
                                        isMulti
                                        isClearable
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md="4">
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
                                  <Col md="4">
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
                                  <Col md="4">
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
                                  <Col md="6">
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
                                      </FormSelect>
                                    </Form.Group>
                                  </Col>
																	<Col md="6">
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
                                  */}
                                </Row>
                                <button className="mt-1 punchred-button" disabled={!t_and_c}>
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
    </div>
  );

}

export default CreateCollab;