import { Row, Col, Form, Button } from "react-bootstrap";
import Select from 'react-select';
import { checkIfEmailNotTaken, googleSignup } from "../../../api/onboarding";
import validator from 'validator';
import { GoogleLogin } from '@react-oauth/google';

import { IoIosArrowBack } from "react-icons/io";

const AdditionalInfo = ({handleGoogleSignup, handleSignup, prevStep, userDetails, setUserDetails, errors, collabKeywords, setErrors}) => {
  const validate = (name, value) => {
    if(name === "name") setErrors(state => ({...state, name: value.length === value.trim().length && validator.isAlpha(value.replaceAll(" ", ""))?"":"Enter valid name"}))
    if(name === "email") setErrors(state => ({...state, email: validator.isEmail(value.toLowerCase())?"":"Enter valid email"}))
    if(name === "password") {
      setErrors(state => ({...state, 
        password: userDetails.password?userDetails.password.length > 6?"":"Password should be minimum 6 letters":"Please Enter A Valid Password"}))
    }
    return null
  }

  const handleChange = (e) => {
    let value = e.target.value.trim();
    if(e.target.value[e.target.value.length - 1] === " " && value.length > 0) {
      value += " "
    }

    if(e.target.name === "name" && e.target.value.length > 14) return
    if(e.target.name === "password" && e.target.value.length > 14) return

    validate(e.target.name, e.target.value)
    if(e.target.name === "password" && !e.target.value) setErrors(state => ({...state, password: "Password is Compulsory"}))
    if(e.target.name === "password" && e.target.value.length < 6) setErrors(state => ({...state, password: "Password must contain atleast 6 characters"}))
    if(e.target.name === "password" && e.target.value && e.target.value.length >= 6) setErrors(state => ({...state, password: ""}))
    if(userDetails.password && e.target.name === "c_password" && userDetails.password !== e.target.value) setErrors(state => ({...state, c_password: "Passwords don't match"}))
    if(userDetails.password && e.target.name === "c_password" && userDetails.password === e.target.value) setErrors(state => ({...state, c_password: ""}))
    
    if(e.target.name === "email") {
      setUserDetails(state => ({...state, email: value.trim()}))
      return;
    }
    setUserDetails(state => ({...state, [e.target.name]: value}))
  }

  const handleCollabKeywordsChange = (values) => {
    if(values && values.length > 5) {
      window.alert("You can only select maximum of 5 keywords")
      return
    }
    setUserDetails(state => ({...state, collabKeywords: values}))
  }

  const handleCheckEmailAvailable = async () => {
    if(userDetails.email) {
      if(!validator.isEmail(userDetails.email.toLowerCase())) return;

      const isEmailNotTaken = await checkIfEmailNotTaken(userDetails.email.toLowerCase())
      if(!isEmailNotTaken.success) {
        setErrors(state => ({...state, email: isEmailNotTaken.message}))
        return;
      } else setErrors({...errors, email: ""})
    }
  }

  const handleClear = () => {
    setUserDetails(state => ({
      ...state,
      email: "",
      name: "",
      collabKeywords: [],
      password: "",
      c_password: "",
    }))
    setErrors(state => ({
      ...state,
      email: "",
      name: "",
      collabKeywords: "",
      password: "",
      c_password: "",
    }))
  }

  const handleGoogleLoginSuccess = async (response) => {
    handleGoogleSignup(response.credential)
  }

  return (
    <div
      md={6}
      className="bg-white pb-lg-0 position-relative ps-1"
      style={{ overflowX: "hidden"}}
    >
      <Row className="justify-content-start h-100" style={{marginTop: "40px"}}>
        <Col md="8" xs="10" className="h-100">
          <div className="d-flex">
            <span className="fs-2" onClick={prevStep}>
              <IoIosArrowBack />
            </span>
            <h2 className="font-weight-bold my-2 mx-2 d-flex align-items-center ">
              Account Information
            </h2>
          </div>

          <div className="d-flex flex-row justify-content-center mt-3">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
              shape="pill"
              text="signup_with"
              width={150}
            />
          </div>

          <div className="d-flex flex-row justify-content-center mt-3" style={{gap: "20px"}}>
            <div style={{flexGrow: "1", borderBottom: "1px solid #ccc", transform: "translateY(-10px)"}}></div>
            <div> OR </div>
            <div style={{flexGrow: "1", borderBottom: "1px solid #ccc", transform: "translateY(-10px)"}}></div>
          </div>

          <Form className="text-start ">
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Name<span style={{ color: "red" }}>*</span>{" "}
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Your Name" 
                    style={{border: (errors.name)?"1px solid red":""}}
                    name="name"
                    required
                    value={userDetails.name}
                    onChange={handleChange}
                  />
                  {
                    errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )
                  }
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Email<span style={{ color: "red" }}>*</span>{" "}
                  </Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter Your Email" 
                    style={{border: (errors.email)?"1px solid red":""}}
                    value={userDetails.email}
                    onChange={handleChange}
                    onBlur={handleCheckEmailAvailable}
                    required
                    name="email"
                  />
                  {
                    errors.email && (
                      <p className="text-danger">{errors.email}</p>
                    )
                  }
                  {
                    userDetails.email && !errors.email && (
                      <p className="text-success">Email available</p>
                    )
                  }
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="form-group mt-2">
                  <Form.Label htmlFor="exampleFormControlSelect2">Location Info </Form.Label>
                  <Select
                    className="dropdown"
                    placeholder="Select Location Info"
                    value={userDetails.collabKeywords} // set selected values
                    options={collabKeywords.map((item) => ({label: item.collabTag, value: item._id}))} // set list of the data
                    onChange={handleCollabKeywordsChange} // assign onChange function
                    isMulti
                    isClearable
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Password<span style={{ color: "red" }}>*</span>{" "}
                  </Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter Your Password" 
                    required
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                  />
                  {
                    errors.password && (
                      <p className="text-danger">{errors.password}</p>
                    )
                  }
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Confirm Password<span style={{ color: "red" }}>*</span>{" "}
                  </Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Re-Enter The Password" 
                    required
                    name="c_password"
                    value={userDetails.c_password}
                    onChange={handleChange}
                  />
                  {
                    errors.c_password && (
                      <p className="text-danger">{errors.c_password}</p>
                    )
                  }
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <div className="mb-5 d-flex flex-row justify-content-start gap-3">
            <Button className="rounded-pill" style={{width: "100px"}} onClick={handleSignup}>
              Signup
            </Button>
            <button className="btn btn-outline-primary rounded-pill" style={{width: "100px"}} onClick={handleClear}>
              Clear
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalInfo;
