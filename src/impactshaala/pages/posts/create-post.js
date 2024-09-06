import React, { useState } from 'react';
import { Col, Card, Container, Row, Image, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../components/partials/dashboard/SidebarStyle/sidebar';
import logo from '../../../assets/images/logo.png';

function CreatePost() {
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

  return (
    <div>
      <Header />
      <Sidebar/>
      <div className="main-content">
        <Container fluid className="p-5">
          <Row>
            <Col>
              {/*<h2>Create Post</h2>*/}
            <div>
                <Row>
                    <Col sm="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h2 className="card-title">Create post</h2>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md="12">
                                        <Form id="form-wizard3" className="text-start">
                                            <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                                                <div className="form-card text-left">
                                                    <Row>
                                                        <div className="col-12">
                                                            <h3 className="mb-4">User Information:</h3>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>First Name: *</Form.Label>
                                                                <Form.Control type="text" id="fname" name="fname" placeholder="First Name" required="required" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Last Name: *</Form.Label>
                                                                <Form.Control type="text" id="lname" name="lname" placeholder="Last Name" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label >Gender: *</Form.Label>
                                                                <Form.Check className="form-check">
                                                                    <Form.Check className="form-check form-check-inline">
                                                                        <Form.Check.Input type="radio" className="form-check-input" name="customRadio" id="customRadio1"/>
                                                                        <Form.Check.Label> Male</Form.Check.Label>
                                                                    </Form.Check>
                                                                    <Form.Check className="form-check form-check-inline">
                                                                        <Form.Check.Input type="radio" className="form-check-input" name="customRadio" id="customRadio2"/>
                                                                        <Form.Check.Label> Female</Form.Check.Label>
                                                                    </Form.Check>
                                                                </Form.Check>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Date Of Birth: *</Form.Label>
                                                                <Form.Control type="date" id="dob" name="dob" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <Button id="submit" name="next" className="btn-primary next action-button float-end" value="Next" onClick={() => AccountShow('Account')}>Next</Button>
                                            </fieldset>
                                            <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                                                <div className="form-card text-left">
                                                    <Row>
                                                        <div className="col-12">
                                                            <h3 className="mb-4">Contact Information:</h3>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Email Id: *</Form.Label>
                                                                <Form.Control type="email" id="email" name="email" placeholder="Email Id" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Contact Number: *</Form.Label>
                                                                <Form.Control type="text" id="ccno" name="ccno" placeholder="Contact Number" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>City: *</Form.Label>
                                                                <Form.Control type="text" id="city" name="city" placeholder="City." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>State: *</Form.Label>
                                                                <Form.Control type="text" id="state" name="state" placeholder="State." />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <Button varint="primary" name="next" className="next action-button float-end" value="Next" onClick={() => AccountShow('Personal')}>Next</Button>
                                                <Button variant="dark" name="previous" className="previous action-button-previous float-end me-3" value="Previous" onClick={() => AccountShow('A')}>Previous</Button>
                                            </fieldset>
                                            <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                                                <div className="form-card text-left">
                                                    <Row>
                                                        <div className="col-12">
                                                        <h3 className="mb-4">Official Information:</h3>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Employee Id: *</Form.Label>
                                                                <Form.Control type="email" className="form-control" id="empid" name="empid" placeholder="Employee Id." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Designation: *</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="desg" name="desg" placeholder="Designation." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Department Name: *</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="accname" name="accname" placeholder="Department Name." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Working Hour: *</Form.Label>
                                                                <Form.Control type="text" className="form-control" id="workhour" name="workhour" placeholder="Working Hour." />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <Button variant="primary" name="next" className="next action-button float-end" value="Submit" onClick={() => AccountShow('Image')}>Next</Button>
                                                <Button variant="dark" name="previous" className="previous action-button-previous float-end me-3" value="Previous" onClick={() => AccountShow('Account')}>Previous</Button>
                                            </fieldset>
                                            <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                                                <div className="form-card text-left">
                                                    <Row>
                                                        <div className="col-12">
                                                            <h3 className="mb-4 text-left">Payment:</h3>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Pan No: *</Form.Label>
                                                                <Form.Control type="text" id="panno" name="panno" placeholder="Pan No." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Account No: *</Form.Label>
                                                                <Form.Control type="text" id="accno" name="accno" placeholder="Account No." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Account Holder Name: *</Form.Label>
                                                                <Form.Control type="text" id="holname" name="accname" placeholder="Account Holder Name." />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>IFSC Code: *</Form.Label>
                                                                <Form.Control type="text" id="ifsc" name="ifsc" placeholder="IFSC Code." />
                                                            </Form.Group>
                                                        </Col>  
                                                    </Row>
                                                </div>
                                                <Button variant="primary" className="action-button float-end" href="#" onClick={() => AccountShow('Image2')}>Submit</Button>
                                                <Button variant="dark" name="previous" className="previous action-button-previous float-end me-3" value="Previous" onClick={() => AccountShow('Personal')}>Previous</Button>
                                            </fieldset> 
                                            <fieldset className={`${show === 'Image2' ? 'd-block' : 'd-none'}`}>
                                                <div className="form-card">
                                                    <Row>
                                                        <div className="col-7">
                                                            <h3 className="mb-4 text-left">Finish:</h3>
                                                        </div>
                                                        <div className="col-5">
                                                            <h2 className="steps">Step 4 - 4</h2>
                                                        </div>
                                                    </Row>
                                                    <br/><br/>
                                                    <h2 className="text-success text-center"><strong>SUCCESS !</strong></h2>
                                                    <br/>
                                                    <Row className="justify-content-center">
                                                        <div className="col-3"> 
                                                            <Image src={""} className="img-fluid" alt="fit-image"/>
                                                        </div>
                                                    </Row>
                                                    <br/><br/>
                                                    <Row className="justify-content-center">
                                                        <div className="col-7 text-center">
                                                            <h5 className="purple-text text-center">You Have Successfully Signed Up</h5>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </fieldset>
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

export default CreatePost;