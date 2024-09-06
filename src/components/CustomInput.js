import React from 'react'
import { Form } from 'react-bootstrap'

const CustomInput = (props) => {
	const {
		error, 
		label, 
		type = "text", 
		value, 
		onChange, 
		name, 
		placeholder, 
		as = "input",
		disabled = false,
		required = false,
	} = props;
	return (
		<Form.Group className="form-group">
			<Form.Label>{label}{required && <span style={{ color: "red" }}>*</span>}</Form.Label>
			<Form.Control 
				type={type}
				as={as}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				name={name}
				disabled={disabled}
				required={required}
			/>
			{
				!error && (
					<Form.Control.Feedback type="invalid" tooltip>
						This field is mandatory
					</Form.Control.Feedback>
				)
			}
			{
				error && (
					<p className="text-danger">{error}</p>
				)
			}
		</Form.Group>
	)
}

export default CustomInput