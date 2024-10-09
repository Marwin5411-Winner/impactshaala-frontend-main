import { useState, useEffect } from 'react'; 
import { BsArrowLeftShort } from 'react-icons/bs';
import { Form, Row, Col } from 'react-bootstrap';
import usertypedata from './onboarding.json';
import ReactSelect from 'react-select';
import validator from 'validator';

const usertypes = [
	"usertype1",
	"usertype2",
	"usertype3",
	"usertype4",
	"usertype5",
	"usertype6"
]

const UserTypes = ({userDetails, setUserDetails, nextStep, prevStep}) => {
	const [formData, setFormData] = useState(null)
	const [formComplete, setFormComplete] = useState(false)

	useEffect(() => {
		if(userDetails.accountType === "ORGANIZATION") {
			setFormData(usertypedata.options[0])
		}
		if(userDetails.accountType === "INDIVIDUAL") setFormData(usertypedata.options[1])
	}, [])

	useEffect(() => {
		console.log(userDetails)
	}, [userDetails])

	const handlePrevStep = () => {
		setUserDetails(state => ({
			...state,
			usertype1: "",
			usertype2: "",
			usertype3: "",
			usertype4: "",
			usertype5: "",
			usertype6: "",
		}))
		prevStep()
	}

	return (
		<div className="pe-5 pb-5" style={{paddingTop: "50px"}}>
			<div className="d-flex flex-row justify-content-start" style={{gap: "10px"}}>
				<div onClick={handlePrevStep}>
					<BsArrowLeftShort style={{height: "100%", width: "30px"}}/>
				</div>
				<h2>User Type</h2>
			</div>
			<Row>
				<Col md={8}>
					<div>
						{
							userDetails && formData && <SelectUserType userDetails={userDetails} formData={formData} setUserDetails={setUserDetails} setFormComplete={setFormComplete}/>
						}
					</div>
					<div className="mt-5">
						<button 
							type="button" 
							onClick={nextStep}
							className="btn btn-primary rounded-pill"
							style={{width: "150px"}}
							disabled={!formComplete}
						>
							Next
						</button>
					</div>
				</Col>
			</Row>
		</div>
	)
}

const SelectUserType = ({formData, userDetails, setUserDetails, setFormComplete}) => {
	const [nextFormData, setNextFormData] = useState(null)

	useEffect(() => {
		if(userDetails && userDetails[formData.key] && formData.options) {
			if (formData.inputType === "input") {
				setNextFormData(formData.options[0]);
				return;
			  }
		
			  if (formData.inputType === "multi-select") {
				// Handle multi-select options
				// Extract values from the selected objects in userDetails[formData.key]
				const selectedValues = userDetails[formData.key].map((item) => item.label);

				// Filter the form options based on the selected values
				const selectedItems = formData.options.filter((item) => selectedValues.includes(item.name));
				console.log(selectedItems);
				
				if (selectedItems.length > 0) {
				  setNextFormData(selectedItems[0]); // Set the first item with options or next step
				}
				
				// Mark form complete if no next options
				if (selectedItems.length > 0 && !selectedItems[0].options) {
				  setFormComplete(true);
				}
			  } else {
				// Handle single-select
				const selected = formData.options.find((item) => item.name === userDetails[formData.key]);
				if (selected && (selected.options || selected.inputType === "input" || selected.inputType === "multi-field")) {
				  setNextFormData(selected);
				}
				if (selected && !selected.options) {
				  setFormComplete(true);
				}
			  }
		} else setNextFormData(null)
	}, [userDetails])

	const handleChange = (value) => {
		if(value === null) return

		const index = usertypes.indexOf(formData.key)
		const tempData = {}
		usertypes.slice(index + 1).forEach(key => {tempData[key] = ""})
		setUserDetails(state => ({
			...state, 
			[formData.key]: value,
			...tempData,
		}))
	}

	return (
		<div className="mt-2">
			<div>
				{formData.inputType !== "multi-field" && (
					<label>{formData.label?formData.label:"Select User Type"}</label>
				)}
				{formData.inputType === "select" && <Select {...formData} altKey={formData.key} userDetails={userDetails} onChange={handleChange}/>}
				{formData.inputType === "multi-select" && <MultiSelect {...formData} altKey={formData.key} userDetails={userDetails} onChange={handleChange}/>}
				{formData.inputType === "input" && <Input {...formData} altKey={formData.key} userDetails={userDetails} onChange={handleChange}/>} 
				{formData.inputType === "multi-field" && <MultiField {...formData} userDetails={userDetails} setFormComplete={setFormComplete} setUserDetails={setUserDetails} onChange={handleChange}/>}
			</div>
			{
				formData.key && userDetails[formData.key].includes("Others") && <LastInput {...formData} altKey={formData.key} userDetails={userDetails} onChange={handleChange}/>
			}
			{
				nextFormData && (nextFormData.key || nextFormData.fields) && <SelectUserType formData={nextFormData} userDetails={userDetails} setUserDetails={setUserDetails} setFormComplete={setFormComplete}/>
			}
		</div>
	)
}

const Select = ({userDetails, altKey: key, label, options, onChange}) => {
	return (
		<select 
			style={{color: userDetails[key]?"black": "gray"}} 
			value={userDetails[key].includes("Others")?"Others": userDetails[key]} 
			onChange={(e) => onChange(e.target.value)} 
			className="w-100 p-2"
		>
			<option value="" style={{color: "gray"}}>{label?label:"Select Your User Type"}</option>
			{
				options && Array.isArray(options) && options.map(({name}, index) => (
					<option key={index} value={name} style={{color: "black"}}>
						{name}
					</option>
				))
			}
		</select>
	)
}

const MultiField = ({userDetails, fields, setUserDetails, setFormComplete, onChange}) => {
	return (
		<div>
			{
				fields && Array.isArray(fields) && fields.map((formData, index) => {
					return <SelectUserType formData={formData} userDetails={userDetails} setUserDetails={setUserDetails} setFormComplete={setFormComplete} key={index} onChange={onChange}/>
				})
			}
		</div>
	)
}

const MultiSelect = ({userDetails, altKey: key, label, options, onChange}) => {
	const handleChange = (value) => {
		onChange(value)
	}

	return (
		<ReactSelect
			className="dropdown"
			styles={{
				control: (baseStyles, state) => ({
					...baseStyles,
					borderColor: "black",
				}),
			}}
			placeholder={label?label: "Select User Type"}
			value={userDetails[key]} // set selected values
			options={options.map((item) => ({label: item.name, value: item.name}))} // set list of the data
			onChange={handleChange} // assign onChange function
			isMulti
			isClearable
		/>
	)
}

const Input = ({userDetails, altKey: key, label, onChange}) => {
	const [error, setError] = useState("")
	const handleChange = (e) => {
		const value = e.target.value;
		if(value.length !== value.trim().length) setError("Please Remove Leading and Trailing Spaces")
		if(value && !validator.isAlphanumeric(value.replaceAll(" ", ""))) setError("Please Enter A Valid Value")
		if(value && validator.isAlphanumeric(value.replaceAll(" ", "")) && value.trim().length === value.length) setError("")
		onChange(e.target.value)
	}

	return (
		<div>
			<input 
				type="text" 
				value={userDetails[key]} 
				placeholder={label?label:"Enter Your User Type"} 
				onChange={handleChange} 
				className="px-2 w-100"
			/>
			{error && (
				<p className="text-danger">{error}</p>
			)}
		</div>
	)
}

const LastInput = ({userDetails, altKey: key, label, onChange}) => {
	const handleChange = (e) => {
		onChange("Others" +  e.target.value)
	}

	return (
		<div className="mt-2">
			<label>Please Specify</label>
			<input 
				type="text" 
				value={userDetails[key].replace("Others", "")} 
				placeholder={label?label.replace("Select", "Enter"):"Enter Your User Type"} 
				onChange={handleChange} 
				className="px-2 w-100"
			/>
		</div>
	)
}

export default UserTypes;