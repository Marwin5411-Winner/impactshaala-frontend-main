import React, { useState, useEffect } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import logo from "../../../assets/images/logo.png";
import SignupSection from "./SignupSection";
import AccountTypeSection from './AccountType';
import AccountInfoSection from './AccountInfo';
import UserTypes from "./UserTypes";
import { createAccount, getUserTypes } from "../../../api/onboarding";
import staticusertypes from '../../../tempData/usertypes.json';
import { useNavigate } from "react-router-dom";
import { validate } from "../../../utilities/formValidation";
import { getCollabKeywords } from "../../../api/collaboration";
import { googleSignup } from "../../../api/onboarding";

function SignUpIndex() {
  const navigate = useNavigate()

  const [usertypes, setUsertypes] = useState([])
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
		accountType: "",
		usertype1: "",
		usertype2: "",
		usertype3: "",
		usertype4: "",
    usertype5: "",
		email: "",
		password: "",
    name: "",
    collabKeywords: [],
    c_password: "",
  });
  const [collabKeywords, setCollabKeywords] = useState([])
  const [errors, setErrors] = useState({
		email: "",
		password: "",
    name: "",
    c_password: "",
  });
  const [miscError, setMiscError] = useState("")

  const nextStep = () => {
    setCurrentStep((step) => step + 1);
  };

  const previousStep = () => {
    setErrors({
      email: "",
      password: "",
      name: "",
      c_password: "",
    })
    setCurrentStep((step) => step - 1);
  };

  const validateForm = () => {
    const data = {...userDetails}
    return {
      email: validate(data.email, "email"),
      name: validate(data.name, "text", "Enter Valid Name"),
    }
  }

  const replaceOthers = (str) => {
    let tempstr = str;
    return tempstr.replace("Others", "")
  }

  const handleSignup = async () => {
    const tempErrors = validateForm()
    const error = Object.keys(tempErrors).find((key) => !!tempErrors[key])
    setErrors(tempErrors)
    if(error) {
      return
    }

    if(!userDetails.password) {
      setErrors(state => ({...state, password: "Please Enter A Valid Password"}))
      window.alert("Please Enter A Valid Password")
    }
    if(!userDetails.c_password) {
      setErrors(state => ({...state, c_password: "Please confirm the entered password"}))
    }


    try {
      if(!loading) {
        setLoading(true) 
        const userTypes = {
          userType1: replaceOthers(userDetails.usertype1),
          userType2: replaceOthers(userDetails.usertype2),
          userType3: replaceOthers(userDetails.usertype3),
          userType4: replaceOthers(userDetails.usertype4),
          userType5: replaceOthers(userDetails.usertype5),
        }
        const resp = await createAccount({
          ...userDetails, 
          email: userDetails.email.toLowerCase(),
          collabKeywords: userDetails.collabKeywords.map((item) => item.value),
          ...userTypes
        })
        if(resp.success) navigate("/signup-success", {state: resp.message})
        setLoading(false)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleGoogleSignup = async (credential) => {
    try {
      if(!loading) {
        setLoading(true)
        const userTypes = {
          userType1: replaceOthers(userDetails.usertype1),
          userType2: replaceOthers(userDetails.usertype2),
          userType3: replaceOthers(userDetails.usertype3),
          userType4: replaceOthers(userDetails.usertype4),
          userType5: replaceOthers(userDetails.usertype5),
        }
        const res = await googleSignup(credential, {
          ...userDetails,
          ...userTypes
        })
        if(res.errRes) {
          if(res.errRes.data.message) {
            setErrors(state => ({...state, misc: res.errRes.data.message}))
            window.alert(res.errRes.data.message)
            return
          }
        }
        if(res.data.success) navigate("/signup-success", {state: res.data.message})
        if(!res.data.success) setErrors(state => ({...state, misc: res.data.message}))
        setLoading(false)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const fetchUsertypes = () => {
    getUserTypes()
      .then(data => setUsertypes(data))
      .catch(err => {
        setUsertypes(staticusertypes)
        console.log("Error while getting user types")
      })
  }

  const fetchCollabKeywords = async () => {
    const resp = await getCollabKeywords()
    if(resp.errRes) {
      if(resp.errRes.response) {
        window.alert(resp.errRes.response.data.message)
        return
      }
      if(resp.errRes.message)  {
        window.alert(resp.errRes.message)
        return
      }
      console.log(resp)
      return
    }
    setCollabKeywords(resp.data.data)
  }

  useEffect(() => {
    fetchUsertypes()
    fetchCollabKeywords()
  }, [])

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
            <Col md={6} className="d-flex flex-column justify-content-start bg-white pb-lg-0 h-100 overflow-auto" style={{paddingTop: "30px"}}>
							<div className="position-relative">
								<Image src={logo} className="img-fluid ms-5 ps-md-4" style={{ height: "50px" }} />
							</div>
							<div className="ps-4" style={{flexGrow: "1"}}>
								{currentStep === 1 && <SignupSection nextStep={nextStep}/>}
								{currentStep === 2 && <AccountTypeSection nextStep={nextStep} prevStep={previousStep} userDetails={userDetails} setUserDetails={setUserDetails} options={["INDIVIDUAL","ORGANIZATION"]}/>}
                {currentStep === 3 && <UserTypes nextStep={nextStep} prevStep={previousStep} userDetails={userDetails} setUserDetails={setUserDetails} usertypes={usertypes}/>}
								{currentStep === 4 && <AccountInfoSection handleGoogleSignup={handleGoogleSignup} prevStep={previousStep} userDetails={userDetails} setUserDetails={setUserDetails} handleSignup={handleSignup} errors={errors} collabKeywords={collabKeywords} setErrors={setErrors}/>}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SignUpIndex;
