import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

//link
import { Link } from "react-router-dom";

//icons
import { BsFillEyeSlashFill as BsEyeSlash, BsGoogle } from "react-icons/bs";
import { BsFillEyeFill as BsEye } from "react-icons/bs";
import logo from "../../../assets/images/logo.png";
import { googleLogin, login } from "../../../api/login";

import React, { useState } from "react";
import { setLocalStorage } from "../../../utilities/localStorage";

function IndexImpactShaala() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    if(e.target.name === "password" && e.target.value.length > 14) return
    setFormData(state => ({...state, [e.target.name]: e.target.value}))
  }

  const handleShowPasswordButton = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const resp = await login({
        ...formData,
        email: formData.email.toLowerCase(),
      })
      if(resp && resp?.data) {
        setLocalStorage("token", resp.data.token)
        setLocalStorage("user", resp.data.data)
        navigate("/dashboard") 
        setError("")
      }
    }
    catch(err) {
      if(err.response && err.response.data) {
        setError(err.response.data.message)
        return;
      }
      window.alert(err.message)
      return;
    }
  }

  const handleGoogleLoginSuccess = async (response) => {
    const res = await googleLogin(response.credential)
    if(res.errRes) {
      if(res.errRes.data.message) {
        setError(res.errRes.data.message)
        return
      }
    }
    if(res.data.success) {
      setLocalStorage("token", res.data.token)
      setLocalStorage("user", res.data.data)
      navigate("/dashboard") 
      setError("")
    }
    if(!res.data.success) setError(res.data.message)
  }

  return (
    <>
      <section className="sign-in-page">
        <Container fluid className="pb-0 h-100 h-sm-auto">
          <Row className="no-gutters h-100 h-sm-auto">
            <Col
              md={6}
              className="bg-white p-4 d-none d-md-block "
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
              className="bg-white pb-lg-0 d-flex justify-content-start align-items-center position-relative"
            >
              <div className="ms-4 w-100" style={{maxWidth: "350px"}}>
                <Image
                  src={logo}
                  className="img-fluid mb-lg-3 mb-md-0 mb-sm-0 position-absolute ms-4"
                  style={{ 
                    height: "50px",
                    width: "auto",
                    top: "30px",
                    left: "5px"
                  }}
                />
                <div className="text-start">
                  <h2 className="mb-3 " style={{color: "#F77F00", fontWeight: "bold"}}>Sign In</h2>
                </div>

                <Row className="justify-content-start mx-3 mx-lg-0 mx-md-0">
                  <Col md={12} className="p-0">
                    <Form.Group className="form-group">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className="p-0">
                    <Form.Group className="form-group mb-0 relative">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Your password"
                          value={formData.password}
                          onChange={handleChange}
                          name="password"
                        />

                        <Button
                          className="position-absolute right-0"
                          style={{
                            right: "0px",
                            background: "transparent",
                            border: "none",
                            zIndex: "10",
                          }}
                          onClick={handleShowPasswordButton}
                        >
                          {showPassword ? <BsEye style={{color: "gray"}}/>:<BsEyeSlash style={{color: "gray"}}/>}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex flex-row justify-content-end">
                      <Link to="/forgetpassword">
                        <p  style={{color: "#D62828", fontWeight: "bold"}}>Forgot Password?</p>
                      </Link>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-start mx-3 mx-lg-0 mx-md-0 row">
                  {
                    error && (
                      <Col md={12} style={{color: "red"}}>{error}</Col>
                    )
                  }
                  <Col md={12} className="d-flex justify-content-start mt-2 p-0" style={{gap: "10px"}}>
                    <Button 
                      style={{width: "150px", borderRadius: "100px", fontWeight: "700"}}
                      onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                      useOneTap
                      shape="pill"
                      text="signin"
                      width={150}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="d-flex justify-content-start m-0 mt-4">
                    <Link to="/onboarding" className="m-0">
                      Don't have an account? 
                      <span style={{color: "#D62828", fontWeight: "bold"}}>
                        {" "}Sign Up
                      </span>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default IndexImpactShaala;
