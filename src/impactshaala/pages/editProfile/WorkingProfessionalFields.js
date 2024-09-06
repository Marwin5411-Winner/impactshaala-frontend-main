import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const WorkingProfessionalFields = ({data, errors, handleChange}) => {
	console.log(data)

	const handleWorkExperienceChange = (e, index) => {
		const tempData = data.workExperience.map((item, ind) => {
			if(ind === index) return {...item, [e.target.name]: e.target.value}
			else return {...item}
		})
		console.log(tempData)
		handleChange({
			target: {
				name: "workExperience",
				value: tempData,
			}
		})
	}

	const handleAddWorkExperience = () => {
		handleChange({
			target: {
				name: "workExperience",
				value: [...data.workExperience, {
					designation: "",
					duration: "",
					nameOfOrganization: ""
				}]
			}
		})
	}

	return (
		<div>
			<Row>
				<Col md="6">
					<Form.Group className="form-group">
						<Form.Label>Location</Form.Label>
						<Form.Control 
							as="textarea"
							rows={1}
							placeholder="Enter Your Location / Location Of Your Organization"
							value={data.location}
							onChange={handleChange}
							name="location"
						/>
						{
							errors.location && (
								<p className="text-danger">{errors.location}</p>
							)
						}
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="form-group">
						<Form.Label>Industry</Form.Label>
						<Form.Control 
							type="text"
							placeholder="Enter The Industry You Belong To"
							value={data.industry}
							onChange={handleChange}
							name="industry"
						/>
						{
							errors.industry && (
								<p className="text-danger">{errors.industry}</p>
							)
						}
					</Form.Group>
				</Col>
			</Row>
			{
				data.workExperience && Array.isArray(data.workExperience) && data.workExperience.map((exp, index) => (
					<Row key={index}>
						<Col md="4">
							<Form.Group className="form-group">
								<Form.Label>Name Of The Organization</Form.Label>
								<Form.Control 
									type="text"
									placeholder="Enter The Name Of The Organization You Worked For"
									value={exp.nameOfOrganization}
									onChange={(e) => handleWorkExperienceChange(e, index)}
									name="nameOfOrganization"
								/>
								{
									errors.workExperience[index] && errors.workExperience[index].nameOfOrganization && (
										<p className="text-danger">{errors.workExperience[index].nameOfOrganization}</p>
									)
								}
							</Form.Group>
						</Col>
						<Col md="4">
							<Form.Group className="form-group">
								<Form.Label>Work Designation</Form.Label>
								<Form.Control 
									type="text"
									placeholder="Enter Your Designation"
									value={exp.designation}
									onChange={(e) => handleWorkExperienceChange(e, index)}
									name="designation"
								/>
							</Form.Group>
							{
								errors.workExperience[index] && errors.workExperience[index].designation && (
									<p className="text-danger">{errors.workExperience[index].designation}</p>
								)
							}
						</Col>
						<Col md="4">
							<Form.Group className="form-group">
								<Form.Label>Duration</Form.Label>
								<Form.Control 
									type="text"
									placeholder="Enter The Duration Of The Work"
									value={exp.duration}
									onChange={(e) => handleWorkExperienceChange(e, index)}
									name="duration"
								/>
							{
								errors.workExperience[index] && errors.workExperience[index].duration && (
									<p className="text-danger">{errors.workExperience[index].duration}</p>
								)
							}
							</Form.Group>
						</Col>
					</Row>
				))
			}
			<Row>
				<Col md="4">
					<Button type="button" onClick={handleAddWorkExperience}> 
						<i className="ri-add-line"></i>
						<span className="ms-2">Add Experience</span>
					</Button>
				</Col>
			</Row>
		</div>
	)
}

export default WorkingProfessionalFields