import PageTemplate2 from "../../../components/PageTemplate2";
import { Row, Col, Form, FormSelect, Button } from 'react-bootstrap';
import Card from "../../../components/Card";
import { useState, useEffect } from 'react';
import { createJobPosting } from "../../../api/jobposting";
import { useNavigate } from "react-router-dom";
import validator from 'validator';

const CreatePosting = () => {
	const [minDate, setMinDate] = useState('')
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
		numberOfOpenings: "",
		lastDateToApply: "",
		attachment: "",
		attachmentType: "",
  });
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
		misc: "",
		lastDateToApply: "",
		numberOfOpenings: "",
	})

	const checkAllFieldsPresent = () => {
		if(!formData.workplaceType) {
			setErrors(state => ({...state, workplaceType: "Please Select A Worplace Type"}))
			window.alert("Please Select A Workplace Type")
			return false
		}
		if(formData.workplaceType && formData.workplaceType !== "remote" && !formData.location) {
			setErrors(state => ({...state, location: "Please Enter A Job / Internship Location"}))
			window.alert("Please Enter A Job / Internship Location")
			return false
		}
		if(!formData.type) {
			setErrors(state => ({...state, type: "Please Enter Job / Internship Type"}))
			window.alert("Please Enter Job / Internship Type")
			return	false
		}
		if(!formData.lookingFor) {
			setErrors(state => ({...state, lookingFor: "Please Select Job / Internship Type"}))
			window.alert("Please Select Job / Internship Type")
			return false
		}
		if(formData.contactType === "email" && !formData.email) {
			setErrors(state => ({...state, email: "Please Enter An Email"}))
			window.alert("Please Enter An Email")
			return false
		}
		if(formData.contactType === "phone" && !formData.phoneNo) {
			setErrors(state => ({...state, phoneNo: "Please Enter A Phone Number"}))
			window.alert("Please Enter A Phone Number")
			return false;
		}
		if(!formData.numberOfOpenings) {
			setErrors(state => ({...state, numberOfOpenings: "Please Enter The Number Of Openings"}))
			window.alert("Please Enter The Number Of Openings");
			return false;
		}
		if(!formData.lastDateToApply) {
			setErrors(state => ({...state, lastDateToApply: "Please Select The Last Date To Apply"}))
			window.alert("Please Enter The Last Date To Apply");
			return false;
		}
		return true;
	}

	const handleCreatePosting = async (e) => {
		e.preventDefault();

		if(!checkAllFieldsPresent()) return;

		const error = Object.keys(errors).find(key => !!errors[key])
		console.log(error, errors)
		if(error) {
			window.alert("Please Enter Valid Data")
			return;
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
			numberOfOpenings: formData.numberOfOpenings,
			lastDateToApply: formData.lastDateToApply,
		}

		const res = await createJobPosting(data)
		if(res.errRes) {
			if(res.errRes.data.message) setErrors(state => ({...state, misc: res.errRes.data.message}))
			else setErrors(state => ({...state, misc: "Network Error"}))
			return
		} 
		if(res.data.success) 
			navigate("/dashboard/success", {
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
			console.log(string)
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

		if(name === "numberOfOpenings" && !parseInt(value)) return setErrors(state => ({...state, numberOfOpenings: "Please Enter A Valid Number"}))
		if(name === "numberOfOpenings" && parseInt(value) && parseInt(value) <  0) return setErrors(state => ({...state, numberOfOpenings: "Please Enter A Valid Number"}))
		if(name === "numberOfOpenings" && !validator.isNumeric(value)) return setErrors(state => ({...state, numberOfOpenings: "Please Enter A Valid Number"}))
		if(name === "numberOfOpenings" && validator.isNumeric(value)) return setErrors(state => ({...state, numberOfOpenings: ""}))

		if(name === "lastDateToApply" && !validator.isDate(value)) return setErrors(state => ({...state, lastDateToApply: "Please Enter A Valid Date"}))
		if(name === "lastDateToApply" && validator.isDate(value)) return setErrors(state => ({...state, lastDateToApply: ""}))

		if(name === "lookingFor" && !!value) setErrors(state => ({...state, lookingFor: ""}))
		if(name === "workplaceType" && !!value) setErrors(state => ({...state, workplaceType: ""}))
		if(name === "type" && !!value) setErrors(state => ({...state, type: ''}))
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

	useEffect(() => {
		const today = new Date().toISOString().split("T")[0]
		setMinDate(today)
	}, [])

	return (
		<PageTemplate2>
			<div>
				<Row>
					<Col sm="12" lg="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
                <h3 className="">
                  Create Job / Internship Posting
                </h3>
              </Card.Header>
							<Card.Body>
								<Row>
									<Col md="6">
                    <Form.Group controlId="lookingFor">
                      <Form.Label>Select the type of posting<span style={{ color: "red" }}>*</span>{" "}</Form.Label>
                      <FormSelect name="lookingFor" onChange={handleChange} value={formData.lookingFor}>
                        <option value="Job">
                          Job
                        </option>
                        <option value="Internship">
                          Internship
                        </option>
                      </FormSelect>
                    </Form.Group>
                  </Col>
									<Col md="6">
                    <Form.Group className="form-group">
                      <Form.Label>{formData.lookingFor} Title<span style={{ color: "red" }}>*</span>{" "}</Form.Label>
                      <Form.Control
                        type="text"
                        id="others"
												value={formData.title}
                        name="title"
												onChange={handleChange}
                        placeholder={`Enter the title of ${formData.lookingFor}`}
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
                      <Form.Label> Workplace <span style={{ color: "red" }}>*</span>{" "}</Form.Label>
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
											<Form.Label>Job / Internship Location<span style={{ color: "red" }}>*</span>{" "}</Form.Label>
											<Form.Control
												disabled={formData.workplaceType == "remote"}
												type="text"
												id="others"
												name="location"
												onChange={handleChange}
												value={formData.location}
												placeholder={`Enter the ${formData.lookingFor} location`}
											/>
											{
												errors.location && (
													<p className="text-danger">{errors.location}</p>
												)
											}
										</Form.Group>
                  </Col>
									<Col md="12" className="mb-2">
                    <Form.Group controlId="type">
                      <Form.Label>{formData.lookingFor} Type<span style={{ color: "red" }}>*</span>{" "}</Form.Label>
                      <FormSelect 
												name="type"
												onChange={handleChange}
												value={formData.type}
											>
												<option value="">
													Select your {formData.lookingFor} type
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
                      <Form.Label>What is your preferred method for us to communicate with you?<span style={{ color: "red" }}>*</span>{" "}</Form.Label>
                      <FormSelect 
												name="contactType"
												onChange={handleChange}
												value={formData.contactType}
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
														{formData.contactType == "email"?"Email": "Phone Number"}<span style={{ color: "red" }}>*</span>{" "}
													</Form.Label>
													<Form.Control
														value={formData.contactType === "email"?formData.email:formData.phoneNo}
														type={formData.contactType == "email"?"text":"tel"}
														id="others"
														name={formData.contactType == "email"?"email":"phoneNo"}
														placeholder={
															formData.contactType == "email"?
																"Enter your email address":
																"Enter your phone number"
														}
														onChange={handleChange}
													/>
													{
														formData.contactType === "email" && errors.email && (
															<p className="text-danger">{errors.email}</p>
														)
													}
													{
														formData.contactType === "phone" && errors.phoneNo && (
															<p className="text-danger">{errors.phoneNo}</p>
														)
													}
												</Form.Group>
											)
										}
                  </Col>
									<Col md="6">
										<Form.Group className="form-group">
											<Form.Label>Number of Openings<span style={{ color: "red" }}>*</span>{" "}</Form.Label>
											<Form.Control
												type="number"
												name="numberOfOpenings"
												onChange={handleChange}
												value={formData.numberOfOpenings}
												placeholder="Enter the Number of Openings Present"
											/>
											{
												errors.numberOfOpenings && (
													<p className="text-danger">{errors.numberOfOpenings}</p>
												)
											}
										</Form.Group>
                  </Col>
									<Col md="6">
										<Form.Group className="form-group">
											<Form.Label>Last Date Of Application<span style={{ color: "red" }}>*</span>{" "}</Form.Label>
											<Form.Control
												min={minDate}
												type="date"
												name="lastDateToApply"
												onChange={handleChange}
												value={formData.lastDateToApply}
												placeholder="Enter the Number of Openings Present"
											/>
											{
												errors.lastDateToApply && (
													<p className="text-danger">{errors.lastDateToApply}</p>
												)
											}
										</Form.Group>
                  </Col>
									<Col md="12">
                    <Form.Group className="form-group">
                      <Form.Label>
                        Attachment (optional, you can upload any file of the following formats: .png, .jpeg, .jpg, .pdf, .mp4)
                      </Form.Label>
                      <Form.Control
												onChange={handleFileChange}
                        type="file"
                        name="attachment"
                        accept="image/png, image/jpeg, image/jpg, .pdf, video/mp4"
                      />
                    </Form.Group>
                  </Col>
								</Row>
								{
									errors.misc && (
										<p className="text-danger">{errors.misc}</p>
									)
								}
								<button className="mt-1 punchred-button" onClick={handleCreatePosting}>
                  Create Posting
                </button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
      </div>
		</PageTemplate2>
	)
}

export default CreatePosting;