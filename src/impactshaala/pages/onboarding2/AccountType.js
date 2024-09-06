import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";

const AccountTypeSection = ({userDetails, nextStep, prevStep, setUserDetails, options}) => {
  const handleChange = (value) => {
    setUserDetails(state => ({...state, accountType: value}))
  }

  return (
		<div style={{paddingTop: "100px"}}>
			<div className="d-flex flex-row justify-content-start" style={{gap: "10px"}}>
				<div onClick={prevStep}>
					<BsArrowLeftShort style={{height: "100%", width: "30px"}}/>
				</div>
				<h2>Account Type</h2>
			</div>
			<div>
        <div className="pe-5 d-flex flex-column justify-content-start mt-5" style={{gap: "10px"}}>
          {
            options && Array.isArray(options) && options.map((option, index) => <Option type={option} handleChange={handleChange} isSelected={userDetails.accountType == option} key={index}/>)
          }
        </div>
        <div className="mt-5">
					<button 
						type="button" 
						onClick={nextStep}
						className="btn btn-primary rounded-pill"
						style={{width: "150px"}}
            disabled={!userDetails.accountType}
					>
						Next
					</button>
				</div>
			</div>
		</div>
  )
}

const Option = ({type, handleChange, isSelected}) => {
  return (
    <div className={`border ${isSelected?"border-primary": "border-light"}`} onClick={() => handleChange(type)}>
      <label className="d-flex flex-row justify-content-start px-5 py-3 align-items-center" style={{gap: "20px"}}>
        <div className={`${isSelected?"bg-primary": "border border-primary"}`} style={{width: "10px", height: "10px", borderRadius: "10px"}}></div>
        <div style={{fontSize: "14px", textTransform: "capitalize"}}>{type.toLowerCase()}</div>
      </label>
    </div>
  )
}

export default AccountTypeSection;