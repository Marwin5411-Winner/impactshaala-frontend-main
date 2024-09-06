import { Button, Col, Container, Row, Image, Form } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { requestReset } from "../../api/resetPassword";
import validator from 'validator';

function ForgetPassword() {
  const [email, setemail] = useState("");
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  const handleEmailChange = (e) => {
    setemail(e.target.value.trim())
  };

  const handleRequestResetPassword = (e) => {
    e.preventDefault()

    const tempError = validator.isEmail(e.target.value.toLowerCase())
    setError(tempError)
    if(tempError) return

    requestReset(email.toLowerCase())
      .then(resp => {
        if(resp.data.success) {
          setSuccess(true)
          setSuccessMessage(resp.data.message)
        }
      })
      .catch(err => {
        if(err.response.data.message)
          window.alert(err.response.data.message)
        else window.alert(err.message)
      })
  }

  return (
    <>
      <section className="sign-in-page">
        <Container fluid className="pb-0 h-100 h-sm-auto">
          <Row className="no-gutters h-100 h-sm-auto">
          <Col
            md={6}
            className="bg-white p-4 d-none d-md-block"
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
              md={6}
              className="bg-white pb-lg-0 d-flex justify-content-start align-items-center"
            >
              {
                !success ? (
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
                        className="font-weight-bold mb-5"
                        style={{color: "#F77F00", fontWeight: "bold"}}
                      >Forgot Password</h2>
                    </div>

                    <Row className="justify-content-around mx-3 mx-lg-0 mx-md-0">
                      <Col md={12} className="p-0 mb-2">
                        <Form.Group className="form-group">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={handleEmailChange}
                          />
                          {
                            error && (
                              <p className="text-danger">{error}</p>
                            )
                          }
                        </Form.Group>
                      </Col>
                      <Col md={12} className="p-0">
                        <Button
                          variant={email === "" ? "secondary" : "primary"}
                          type="submit"
                          disabled={email === "" ? true : false}
                          style={{
                            borderRadius:"100px",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                          }}
                          onClick={handleRequestResetPassword}
                        >
                          Send Verification Link
                        </Button>
                      </Col>
                    </Row>
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
                ): (
                  <div className="w-100 px-5">
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
                      >Verification Link Sent</h2>
                    </div>

                    <div className="w-100 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={80} height={80} version="1.1" id="Capa_1" viewBox="0 0 50 50" xmlSpace="preserve">
                        <circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25" />
                        <polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="38,15 22,33 12,25" />
                      </svg>                      
                      <p className="mt-5 text-center" style={{fontSize: "1rem"}}>{successMessage}</p>
                    </div>
                  </div>
                )
              }
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ForgetPassword;
