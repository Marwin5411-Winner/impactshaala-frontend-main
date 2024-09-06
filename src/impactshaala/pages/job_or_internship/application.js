import PageTemplate2 from "../../../components/PageTemplate2";
import { Row, Col, Form, FormSelect, Button } from 'react-bootstrap';
import Card from "../../../components/Card";
import { useState } from 'react';
import { applyForJob } from "../../../api/jobposting";
import { useNavigate } from "react-router-dom";
import validator from 'validator';

const Application = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: "",
		phoneNo: "",
		contactType: "phone",
		workplaceType: "",
		type: "",
		lookingFor: "Job",
		location: "",
		title: "",
		attachment: "",
		attachmentType: "",
		description: ""
  });
	const [t_and_c, set_T_And_C] = useState(false)
	const [errors, setErrors] = useState({
		email: "",
		phoneNo: "",
		contactType: "",
		workplaceType: "",
		type: "",
		lookingFor: "",
		location: "",
		title: "",
		attachment: "",
		attachmentType: "",
		description: "",
		misc: ""
	})

	const handleApplyForJob = async (e) => {
		e.preventDefault();
		if(!formData.title) {
			setErrors(state => ({...state, title: "Please Enter A Job / Internship Title"}))
			window.alert("Please Enter A Job / Internship Title")
			return
		}
		if(!formData.workplaceType) {
			setErrors(state => ({...state, workplaceType: "Please Select A Worplace Type"}))
			window.alert("Please Select A Workplace Type")
			return
		}
		if(formData.workplaceType && formData.workplaceType !== "remote" && !formData.location) {
			setErrors(state => ({...state, location: "Please Enter A Job / Internship Location"}))
			window.alert("Please Enter A Job / Internship Location")
			return	
		}
		if(!formData.type) {
			setErrors(state => ({...state, type: "Please Enter Job / Internship Type"}))
			window.alert("Please Enter Job / Internship Type")
			return	
		}
		if(!formData.lookingFor) {
			setErrors(state => ({...state, lookingFor: "Please Select Job / Internship Type"}))
			window.alert("Please Select Job / Internship Type")
			return
		}
		if(formData.contactType === "email" && !formData.email) {
			setErrors(state => ({...state, email: "Please Enter An Email"}))
			window.alert("Please Enter An Email")
			return
		}
		if(formData.contactType === "phone" && !formData.phoneNo) {
			setErrors(state => ({...state, phoneNo: "Please Enter A Phone Number"}))
			window.alert("Please Enter A Phone Number")
			return
		}
		if(!formData.attachment) {
			setErrors(state => ({...state, attachment: "Please Attach Your CV"}))
			window.alert("Please Attach Your CV")
			return			
		}
		if(!formData.description) {
			setErrors(state => ({...state, description: "Please Enter Ideal Job Description"}))
			window.alert("Please Enter Ideal Job Description")
			return
		}

		const data = {
			jobPostingType: formData.lookingFor,
			jobTitle: formData.title,
			workplaceType: formData.workplaceType,
			jobLocation: formData.location,
			jobType: formData.type,
			communicationType: formData.contactType,
			attachment: formData.attachment,
			attachmentType: formData.attachmentType,
			phone: formData.phoneNo,
			email: formData.email,
			description: formData.description
		}

		const res = await applyForJob(data)
		if(res.errRes) {
			if(res.errRes.data.message) setErrors(state => ({...state, misc: res.errRes.data.message}))
			else setErrors(state => ({...state, misc: "Network Error"}))
			return
		} 
		if(res.data.success) navigate("/dashboard/success", {
			state: {
				prompt: res.data.message
			}
		})
 		if(!res.data.success) setErrors(state => ({...state, misc: res.data.message}))
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0]
		if(!file) return 
		
		const reader = new FileReader()

		reader.onload = (event) => {
			const string = event.target.result;
			validate({name: "attachment", value: string})
			setFormData(state => ({
				...state, 
				[e.target.name]: string, 
				attachmentType: file.name.split(".").slice(-1)[0]
			}))
		}

		reader.readAsDataURL(file)
	}

	const validate = ({name, value}) => {
		setErrors(state => ({...state, misc: ""}))
		if(name === "title" && value.trim().length !== value.length) setErrors(state => ({...state, title: "Please remove leading and trailing spaces"}))
		if(name === "title" && !validator.isAlphanumeric(value.replaceAll(" ", "")))	setErrors(state => ({...state, title: "Please Enter A Valid Title"}))
		if(name === "title" && value.trim().length === value.length && validator.isAlphanumeric(value.replaceAll(" ", ""))) setErrors(state => ({...state, title: ""}))
		if(name === "title" && !value) setErrors(state => ({...state, title: ""}))

		if(name === "location" && value.trim().length !== value.length) setErrors(state => ({...state, location: "Please remove leading and trailing spaces"}))
		if(name === "location" && !validator.isAlphanumeric(value.replaceAll(" ", "").replaceAll(",",""))) setErrors(state => ({...state, location: "Enter valid location"}))
		if(name === "location" && value.trim().length === value.length && validator.isAlphanumeric(value.replaceAll(" ", "").replaceAll(",",""))) setErrors(state => ({...state, location: ""}))

		if(name === "phoneNo" && !validator.isMobilePhone(value, "en-IN")) setErrors(state => ({...state, phoneNo: "Please Enter A Valid Phone Number"}))
		if(name === "phoneNo" && (validator.isMobilePhone(value, "en-IN"))) setErrors(state => ({...state, phoneNo: ""}))

		if(name === "email" && !validator.isEmail(value)) setErrors(state => ({...state, email: "Please Enter A Valid Email"}))
		if(name === "email" && validator.isEmail(value)) setErrors(state => ({...state, email: ""}))
		if(name === "email" && !value) setErrors(state => ({...state, email: ""}))

		if(name === "description" && value.trim().length !== value.length) setErrors(state => ({...state, description: "Please remove leading and trailing spaces"}))
		if(name === "description" && !validator.isAlphanumeric(value.replaceAll(" ", "").replaceAll(",","")))	setErrors(state => ({...state, description: "Please Enter A Valid Job Description"}))
		if(name === "description" && value.trim().length === value.length && validator.isAlphanumeric(value.replaceAll(" ", "").replaceAll(",",""))) setErrors(state => ({...state, description: ""}))
		if(name === "description" && !value) setErrors(state => ({...state, description: ""}))

		if(name === "lookingFor" && !!value) setErrors(state => ({...state, lookingFor: ""}))
		if(name === "workplaceType" && !!value) setErrors(state => ({...state, workplaceType: ""}))
		if(name === "type" && !!value) setErrors(state => ({...state, type: ''}))
		if(name === "attachment" && !!value) setErrors(state => ({...state, attachment: ""}))
	}
  
	const handleChange = (e) => {
		if(e.target.name === "workplaceType" && !e.target.value) return
		if(e.target.name === "title" && e.target.value.length > 50) return
		if(e.target.name === "location" && e.target.value.length > 100) return
		if(e.target.name === "email" && e.target.value.length > 50) return

		validate(e.target)

		if(e.target.name == "workplaceType" && e.target.value == "remote") {
			setFormData(data => ({
				...data,
				location: "",
			}))
		}
		setFormData(data => {
			return {
				...data,
				[e.target.name]: e.target.value
			}
		})
	}

	return (
		<PageTemplate2>
			<div>
				<Row>
					<Col sm="12" lg="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
                <h3 className="">
                  Job / Internship Application
                </h3>
              </Card.Header>
							<Card.Body>
								<Row>
									<Col md="6">
                    <Form.Group controlId="lookingFor">
                      <Form.Label>What are you looking for</Form.Label>
                      <FormSelect name="lookingFor" onChange={handleChange} value={formData.lookingFor}>
                        <option value="job">
                          Job
                        </option>
                        <option value="internship">
                          Internship
                        </option>
                      </FormSelect>
                    </Form.Group>
                  </Col>
									<Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label>Job / Internship Title<span style={{ color: "red" }}>*</span></Form.Label>
                      <Form.Control
												value={formData.title}
                        type="text"
                        name="title"
												onChange={handleChange}
                        placeholder="Enter the title of Job / Internship"
                      />
											{
												errors.title && (
													<p className="text-danger">{errors.title}</p>
												)
											}
                    </Form.Group>
                  </Col>
									<Col md="6">
                    <Form.Group controlId="workplaceType">
                      <Form.Label> Workplace Type<span style={{ color: "red" }}>*</span></Form.Label>
                      <FormSelect 
												name="workplaceType"
												onChange={handleChange}
												value={formData.workplaceType}
											>
												<option value="">
													Select Workplace Type
												</option>
                        <option value="onsite" style={{color: "black"}}>
                          Onsite
                        </option>
                        <option value="hybrid" style={{color: "black"}}>
                          Hybrid
	                      </option>
												<option value="remote" style={{color: "black"}}>
													Remote
												</option>
                      </FormSelect>
											{
												errors.workplaceType && (
													<p className="text-danger">{errors.workplaceType}</p>
												)
											}
                    </Form.Group>
                  </Col>
									<Col md="6">
										<Form.Group className="form-group">
											<Form.Label>Job / Internship Location<span style={{ color: "red" }}>*</span></Form.Label>
											<Form.Control
												disabled={formData.workplaceType == "remote"}
												value={formData.location}
												type="text"
												id="others"
												name="location"
												onChange={handleChange}
												placeholder="Enter the Job / Internship location"
											/>
											{
												formData.workplaceType !== "remote" && errors.location && (
													<p className="text-danger">{errors.location}</p>
												)
											}
										</Form.Group>
                  </Col>
									<Col md="12" className="mb-2">
                    <Form.Group controlId="workplaceType">
                      <Form.Label>Job / Internship Type<span style={{ color: "red" }}>*</span></Form.Label>
                      <FormSelect 
												name="type"
												onChange={handleChange}
												value={formData.type}
											>
												<option value="">
													Select your job / internship type
												</option>
                        <option value="partTime">
                          Part Time
                        </option>
                        <option value="fullTime">
                          Full Time
	                      </option>
                      </FormSelect>
											{
												errors.type && (
													<p className="text-danger">{errors.type}</p>
												)
											}
                    </Form.Group>
                  </Col>
									<Col md="6" className="mt-2">
                    <Form.Group controlId="contactType">
                      <Form.Label>What is your preferred method for us to communicate with you?<span style={{ color: "red" }}>*</span></Form.Label>
                      <FormSelect 
												value={formData.contactType}
												name="contactType"
												onChange={handleChange}
											>
												<option value="">
													Select your contact method
												</option>
                        <option value="phone">
                          Phone Call
                        </option>
                        <option value="email">
                          Email
	                      </option>
                      </FormSelect>
                    </Form.Group>
                  </Col>
									<Col md="6" className="mt-2">
										{
											formData.contactType && (
												<Form.Group className="form-group">
													<Form.Label>
														{formData.contactType == "email"?"Email": "Phone Number"}<span style={{ color: "red" }}>*</span>
													</Form.Label>
													<Form.Control
														type={formData.contactType == "email"?"email":"number"}
														id="others"
														name={formData.contactType == "email"?"email":"phoneNo"}
														placeholder={
															formData.contactType == "email"?
																"Enter your email address":
																"Enter your phone number"
														}
														onChange={handleChange}
														value={formData.contactType == "email"?formData.email:formData.phoneNo}
													/>
													{
														formData.contactType === "phone" && errors.phoneNo && (
															<p className="text-danger">{errors.phoneNo}</p>
														)
													}
													{
														formData.contactType === "email" && errors.email && (
															<p className="text-danger">{errors.email}</p>
														)
													}
												</Form.Group>
											)
										}
                  </Col>
									<Col md="12">
                    <Form.Group className="form-group">
                      <Form.Label>
                        Attachment<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="attachment"
                        accept=".pdf"
												onChange={handleFileChange}
                      />
											{
												errors.attachment && (
													<p className="text-danger">{errors.attachment}</p>
												)
											}
                    </Form.Group>
                  </Col>
									<Col md="12">
                    <Form.Group className="form-group">
                      <Form.Label>
												Share your ideal job description<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="textbox"
												row="2"
                        name="description"
												onChange={handleChange}
												value={formData.description}
												placeholder="Enter the ideal description of a job that you want"
                      />
											{
												errors.description && (
													<p className="text-danger">{errors.description}</p>
												)
											}
                    </Form.Group>
                  </Col>
								</Row>
								<Row>
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
								</Row>
								<button 
									className="mt-1 punchred-button" 
									style={{filter: t_and_c?"grayscale(0%)": "grayscale(100%)", cursor: t_and_c?"pointer":"not-allowed"}} 
									disabled={!t_and_c}
									onClick={handleApplyForJob}
								>
                  Apply
                </button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
      </div>
		</PageTemplate2>
	)
}

export default Application;