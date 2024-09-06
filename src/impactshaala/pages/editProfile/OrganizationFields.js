import { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const OrganizationFields = ({data, errors, handleChange}) => {
	return (
		<div>
			<Row>
				<Col md="6">
					<Form.Group className="form-group">
						<Form.Label className="w-100">Founding Year</Form.Label>
						<Form.Control 
							type="number"
							placeholder="Enter The Year Of Founding"
							value={data.foundingYear}
							onChange={handleChange}
							name="foundingYear"
						/>
						{
							errors.foundingYear && (
								<p className="text-danger">{errors.foundingYear}</p>
							)
						}
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="form-group">
						<Form.Label className="w-100">Location</Form.Label>
						<Form.Control 
							as="textarea"
							placeholder="Enter The Location Of Your Organization"
							rows={1}
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
			</Row>
			<Row>
				<Col md="6">
					<Form.Group className="form-group">
						<Form.Label>Industry</Form.Label>
						<Form.Control 
							type="text"
							placeholder="Enter The Industry You Specialize In"
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
				<Col md="6">
					<Form.Group className="form-group">
						<Form.Label>Organization Size</Form.Label>
						<Form.Control 
							type="number"
							placeholder="Enter The Size Of Your Organization"
							value={data.organizationSize}
							onChange={handleChange}
							name="organizationSize"
						/>
						{
							errors.organizationSize && (
								<p className="text-danger">{errors.organizationSize}</p>
							)
						}
					</Form.Group>
				</Col>
			</Row>
		</div>
	)
}

export default OrganizationFields