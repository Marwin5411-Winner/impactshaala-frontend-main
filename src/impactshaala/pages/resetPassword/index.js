import { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { resetPasswordWithToken, verifyResetPasswordLink } from '../../../api/resetPassword';
import { Row, Col, Container, Image, Form, Button } from 'react-bootstrap';
import logo from '../../../assets/images/logo.png';

const ResetPassword = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const {token} = useParams(location)
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	})
	const [success, setSuccess] = useState(false)
	const [successMessage, setSuccessMessage] = useState("")

	const [isValidLink, setIsValidLink] = useState(false)

	const handleChange = (e) => {
		if(e.target.name === "password" && e.target.value.length > 0) return
		setFormData(state => ({...state, [e.target.name]: e.target.value}))
	}

	const verifyLink = () => {
		verifyResetPasswordLink(token)
			.then(resp => {
				if(resp.data.tokenValid) {
					console.log(resp.data)
					setIsValidLink(true)
				}
			})
			.catch(err => {
				if(err.response && err.response.data && !err.response.data.success) {
					navigate("/login")
				}
				if(err.response && err.response.data.message) {
					setIsValidLink(false)
					console.log(err.response.data.message)
					return
				}
				if(err.message) {
					console.log(err.message)
				}
			})
	}

	const handleResetPassword = () => {
		resetPasswordWithToken(token, formData.password)
			.then(resp => {
				if(resp.data.success) {
					setSuccess(true)
					setSuccessMessage(resp.data.message)
					setTimeout(() => {
						navigate("/login")
					}, 4000)
				}
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		verifyLink()
	}, [])

	return (
		<>
      <section className="sign-in-page">
        <Container fluid className="pb-0 h-100 h-sm-auto">
          <Row className="no-gutters h-100 h-sm-auto">
          <Col
              className="bg-white p-4 col-0 col-md-6 d-none d-md-block"
            >
              <div
                className="w-full"
                style={{ 
                  overflow: "hidden", 
                  zIndex: 2 ,
                  background: "#003049",
                  height: "100%",
                  borderRadius: "30px"
                }}
              >

              </div>
            </Col>
            <Col
              className="bg-white pb-lg-0 d-flex justify-content-start align-items-center w-full"
            >
							{
								success ? (
									<div className="w-100">
                    <div 
                      className="position-absolute"
                      style={{
                        top: "30px"
                      }}
                    >
                      <Image
                        src={logo}
                        className="img-fluid"
                        style={{ height: "50px" }}
                      />
                    </div>

                    <div className="text-center">
                      <h2 
                        className="font-weight-bold mb-5"
                        style={{color: "#F77F00", fontWeight: "bold"}}
                      >Password Reset</h2>
                    </div>

                    <div className="w-100 text-center">
											<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={80} height={80} version="1.1" id="Capa_1" viewBox="0 0 50 50" xmlSpace="preserve">
												<circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25" />
												<polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="38,15 22,33 12,25" />
											</svg>
                      <p className="mt-5 text-center" style={{fontSize: "1rem"}}>{successMessage}</p>
                    </div>
                  </div>
								): (
									<div className="ps-4">
                    <div 
                      className="position-absolute"
                      style={{
                        top: "30px"
                      }}
                    >
                      <Image
                        src={logo}
                        className="img-fluid"
                        style={{ height: "50px" }}
                      />
                    </div>

                    <div className="text-start">
                      <h2 
                        className="font-weight-bold mb-5 text-start"
                        style={{color: "#F77F00", fontWeight: "bold"}}
                      >Forgot Password</h2>
                    </div>
										{
											isValidLink ? (
												<Row className="justify-content-around mx-3 mx-lg-0 mx-md-0">
													<Col md={12} className="p-0 mb-2">
														<Form.Group className="form-group">
															<Form.Label>Password</Form.Label>
															<Form.Control
																type="password"
																placeholder="Enter New Password"
																name="password"
																value={formData.password}
																onChange={handleChange}
															/>
														</Form.Group>
													</Col>
													<Col md={12} className="p-0 mb-2">
														<Form.Group className="form-group">
															<Form.Label>Confirm Password</Form.Label>
															<Form.Control
																type="password"
																placeholder="Confirm Entered Password"
																name="confirmPassword"
																value={formData.confirmPassword}
																onChange={handleChange}
															/>
														</Form.Group>
													</Col>
													<Col md={12} className="p-0">
														{
															formData.password && formData.password !== formData.confirmPassword && (
																<div style={{color: "red"}} className="ps-1">
																	Passwords dont match
																</div>
															)
														}
														<Button
															variant={formData.password === "" || formData.confirmPassword !== formData.password ? "secondary" : "primary"}
															type="submit"
															disabled={!formData.password || formData.password != formData.confirmPassword}
															style={{
																borderRadius:"100px",
																paddingLeft: "20px",
																paddingRight: "20px",
															}}
															className="mt-2"
															onClick={handleResetPassword}
														>
															Reset Password
														</Button>
													</Col>
												</Row>
											): (
												<div>
													Invalid Link
												</div>
											)
										}
                    <div className="position-absolute" style={{bottom: "20px"}}>
                      Remembered the password?{" "}
                      <Link to="/login" 
                        style={{
                          color: "#D62828", 
                          fontWeight: "700",
                          textShadow: "0px 0px 1px #D62828"
                        }}
                      >
                        Log In
                      </Link>
                    </div>
                  </div>
								)
							}
            </Col>
          </Row>
        </Container>
      </section>
    </>
	)
}

export default ResetPassword;