import { Row, Col, Form } from 'react-bootstrap';


const AdminForm = ({
	submitButtonText,
	onSubmit,
	onChange,
	data,
	formHeading,
	errors,
	handleCheckEmailAvailable
}) => {

	return (
		<div>
			<div>
				<h2>{formHeading}</h2>
			</div>
			<Row className="mt-3" style={{maxWidth: "700px"}}>
				<Col md="6">
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control 
							type="text"
							value={data.name}
							placeholder="Enter Your Name"
							onChange={onChange}
							name="name"
						/>
						{
              errors.name && (
                <p className="text-danger">{errors.name}</p>
              )
            }
					</Form.Group>
				</Col>
				<Col md="6">
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control 
							type="email"
							value={data.email}
							placeholder="Enter Your Email Address"
							onChange={onChange}
							name="email"
							disabled={submitButtonText === "Update"}
							onBlur={() => {
								if(submitButtonText !== "Update")
									handleCheckEmailAvailable()
							}}
						/>
						{
              errors.email && (
                <p className="text-danger">{errors.email}</p>
              )
            }
					</Form.Group>
				</Col>
				<Col md="6" className="mt-2">
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control 
							type="password"
							value={data.password}
							placeholder="Enter Your Password"
							onChange={onChange}
							name="password"
						/>
						{
              errors.password && (
                <p className="text-danger">{errors.password}</p>
              )
            }
					</Form.Group>
				</Col>
				<Col md="6" className="mt-2">
					<Form.Group>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control 
							type="password"
							value={data.confirmPassword}
							placeholder="Enter The Password Again"
							onChange={onChange}
							name="confirmPassword"
						/>
						{
              errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )
            }
					</Form.Group>
				</Col>
			</Row>
			<button className="btn punchred-button mt-3" onClick={onSubmit}>
				{submitButtonText}
			</button>
		</div>
	)
}

export default AdminForm;