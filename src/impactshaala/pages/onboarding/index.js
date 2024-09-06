import React, { useState } from "react";
import { motion } from "framer-motion";
import SignUp from "./Onboarding";
import Type from "./Type";
import SubType from "./SubType";
import WorkInformation from "./WorkInformation";
import UserType from "./SectorSelection";
import DataCollection from "./DataCollection";
import { Col, Container, Row } from "react-bootstrap";
import StudentInformation from "./StudentForm";

function SignUpIndex() {
  const [currentStep, setCurrentStep] = useState(1);
  const [prevStep, setPrevStep] = useState(0);
  const [direction, setDirection] = useState("next");

  // used to change the direction of animation

  const nextStep = () => {
    setPrevStep(currentStep);
    setCurrentStep((prevStep) => prevStep + 1);
    setDirection("next");
  };

  const previousStep = () => {
    setPrevStep(currentStep);
    setCurrentStep((prevStep) => prevStep - 1);
    setDirection("prev");
  };

  const [userDetails, setUserDetails] = useState({
    type: "",
    subType: "",
  });

  // variant for the right side animation
  const variantRight = {
    enter: {
      x: 100, // start from the right
      opacity: 0,
    },
    center: {
      x: 0, // center
      opacity: 1,
    },
    exit: {
      x: -100, // exit to the left
      opacity: 0,
    },
  };

  // variant for the left side animation
  const variantLeft = {
    enter: {
      x: -100, // start from the left
      opacity: 0,
    },
    center: {
      x: 0, // center
      opacity: 1,
    },
    exit: {
      x: 100, // exit to the right
      opacity: 0,
    },
  };

  // function to render the step
  // this is done as per the frd guidelines
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SignUp
            nextStep={nextStep}
            currentStep={currentStep}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 2:
        return (
          <Type
            nextStep={nextStep}
            previousStep={previousStep}
            currentStep={currentStep}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 3:
        if (userDetails.type === "organization") {
          return (
            <UserType
              previousStep={previousStep}
              currentStep={currentStep}
              {...userDetails}
              // userDetails={userDetails}
              setUserDetails={setUserDetails}
              nextStep={nextStep}
            />
          );
        } else {
          return (
            <SubType
              nextStep={nextStep}
              previousStep={previousStep}
              currentStep={currentStep}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          );
        }

      case 4:
        if (userDetails.type === "organization") {
          return (
            <DataCollection
              previousStep={previousStep}
              currentStep={currentStep}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              nextStep={nextStep}
            />
          );
        } else if (userDetails.subType === "working") {
          return (
            <WorkInformation
              previousStep={previousStep}
              currentStep={currentStep}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              nextStep={nextStep}
            />
          );
        } else {
          return (
            <StudentInformation 
              previousStep={previousStep}
              currentStep={currentStep}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              nextStep={nextStep}
            />
          )
        }

      case 5:
        return (
          <DataCollection
            previousStep={previousStep}
            currentStep={currentStep}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            nextStep={nextStep}
          />
        )
      default:
        return null;
    }
  };

  return (
    <>
      <section className="sign-in-page">
        <Container fluid className="pb-0 h-100 h-sm-auto">
          <Row className="no-gutters h-100 h-sm-auto">
          <Col
              md={6}
              className="bg-white p-4"
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
            <Col md={6} className="bg-white pb-lg-0">
              <motion.div
                key={currentStep}
                variants={direction === "next" ? variantRight : variantLeft} // set the direction for animation
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                }}
              >
                {/* rendering the component */}
                {renderStep()}
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SignUpIndex;
