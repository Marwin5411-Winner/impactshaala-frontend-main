import React from 'react';
import { Row, Col, Form } from 'react-bootstrap'

const StudentFields = ({data, errors, handleChange}) => {
	return (
		<div>
			<Row>
				<Col md="6">
					<Form.Group className="form-group">
						<Form.Label>Hightest Level Of Education</Form.Label>
						<Form.Control 
							type="text"
							placeholder="Enter Your Highest Level Of Education"
							value={data.highestEducation}
							onChange={handleChange}
							name="highestEducation"
						/>
						{
							errors.highestEducation && (
								<p className="text-danger">{errors.highestEducation}</p>
							)
						}
					</Form.Group>
				</Col>
				<Col md="6">
					<Form.Group className="form-group">
						<Form.Label>Education Instituition Name</Form.Label>
						<Form.Control 
							type="text"
							placeholder="Enter The Name Of The Educational Institution"
							value={data.educationalInstitution}
							onChange={handleChange}
							name="educationalInstitutution"
						/>
						{
							errors.educationalInstitution && (
								<p className="text-danger">{errors.educationalInstitution}</p>
							)
						}
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md="6">
					<Form.Group className="form-group">
						<Form.Label>Course / Stream</Form.Label>
						<Form.Control 
							type="text"
							placeholder="Enter Your Course / Stream"
							value={data.course}
							onChange={handleChange}
							name="course"
						/>
						{
							errors.course && (
								<p className="text-danger">{errors.course}</p>
							)
						}
					</Form.Group>
				</Col>
			</Row>
		</div>
	)
}
export default StudentFields