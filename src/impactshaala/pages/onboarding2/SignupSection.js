import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

import { Link } from "react-router-dom";

const SignupSection = (props) => {
  return (
    <div
      md={12}
      className="bg-white pb-lg-0 d-flex justify-content-start h-100 ps-md-4"
      >
				<div className="d-flex align-items-center m-lg-0 position-relative">
					<div className="d-flex flex-column px-0" style={{gap: "30px", marginBottom: "50px"}}>
						<h2 className="font-weight-bold text-start" style={{color: "#F77F00", fontWeight: "bold"}}>
							Welcome to ImpactShaala
						</h2>
						<p className="text-start" style={{color: "#003049", fontWeight: "bold"}}>
							Where every connection is a step towards a brighter educational future.
						</p>
						<Button
							onClick={() => {
								props.nextStep();
							}}
							className=""
							style={{
								width: "150px",
								borderRadius: "100px",
								fontWeight: "bold",
							}}
						>
							{" "}
							Sign Up
						</Button>
					</div>
					<div
						className="position-absolute"
						style={{
							bottom: "30px",
							left: "0px"
						}}
					>
          	Already a member?{" "}
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
    </div>
  );
};

export default SignupSection;
