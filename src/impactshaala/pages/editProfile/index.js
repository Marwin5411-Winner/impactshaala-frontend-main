import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import { Col, Row, Form, Button, Image } from 'react-bootstrap';
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import AccountInformation from "./AccountInformation";
import ContactInformation from "./ContactInformation";
import { useState, useEffect } from 'react';
import { getMyProfile, updateProfile } from "../../../api/profile";
import { getCollabKeywords } from "../../../api/collaboration";
import Select from 'react-select';
import { setLocalStorage } from "../../../utilities/localStorage";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import AdditionalInformation from "./AdditionalInformation";


const defaultData = {
	name: "",
	email: "",
	tagline: "",
	description: "",
	usertype1: "",
	usertype2: "",
	usertype3: "",
	usertype4: "",
	usertype5: "",
	address: "",
	contactNo: "",
	city: "",
	district: "",
	state: "",
	country: "",
	collabKeywords: [],
	comEmail: "",
	foundingYear: "",
	industry: "",
	organizationSize: "",
	workExperience: [],
	highestEducation: "",
	educationalInstitution: "",
	course: "",
}

const EditProfile = () => {
	const navigate = useNavigate()
	const [userDetails, setUserDetails] = useState({...defaultData});
	const [data, setData] = useState({...defaultData})
	const [collabKeywords, setCollabKeywords] = useState([])
	const [submitError, setSubmitError] = useState("")
	const [errors, setErrors] = useState({
		name: "",
		contactNo: "",
		city: "",
		district: "",
		state: "",
		country: "",
		foundingYear: "",
		industry: "",
		organizationSize: "",
		workExperience: [],
		highestEducation: "",
		educationalInstitution: "",
		course: "",
	})

	const fetchProfile = async (saveToLocal) => {
		try {
			const resp = await getMyProfile()
			if(resp.data.success) {
				const respData = resp.data.data
				respData.collabKeywords = respData.collabKeywords.map((item) => ({label: item.collabTag, value: item._id}))
				setUserDetails(respData)
				setData({...respData})
				if(saveToLocal) {
					setLocalStorage('user', resp.data.data)
				}
			} else console.log(resp.data.message)
		} catch(err) {
			console.log(err)
		}
	}

	const fetchCollabKeywords = async () => {
		try {
			const resp = await getCollabKeywords()
			setCollabKeywords(resp.data.data)
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchCollabKeywords()
		fetchProfile()
	}, [])

	const validate = ({name, value}) => {
		if(name === "name" && !validator.isAlpha(value)) setErrors(state => ({...state, name: "Please Enter a Valid Name"}))
		if(name === "name" && validator.isAlpha(value)) setErrors(state => ({...state, name: ""}))

		if(name === "contactNo" && value && !validator.isMobilePhone(value, "en-IN")) setErrors(state => ({...state, contactNo: "Please Enter a Valid Phone Number"}))
		if(name === "contactNo" && (validator.isMobilePhone(value, "en-IN") || !value)) setErrors(state => ({...state, contactNo: ""}))

		if(name === "comEmail" && value && !validator.isEmail(value)) setErrors(state => ({...state, comEmail: "Please ENter Valid Email Address"}))
		if(name === "comEmail" && (!value || validator.isEmail(value))) setErrors(state => ({...state, comEmail: ""}))

		if(name === "city" && value && value.length !== value.trim().length) setErrors(state => ({...state, city: "Please Remove Leading And Trailing Spaces"}))
		if(name === "city" && value && !validator.isAlpha(value.replaceAll(" ", ""))) setErrors(state => ({...state, city: "Please Enter A Valid City"}))
		if(name === "city" && value.length === value.trim().length && (!value || validator.isAlpha(value.replaceAll(" ", "")))) setErrors(state => ({...state, city: ""}))

		if(name === "district" && value && value.length !== value.trim().length) setErrors(state => ({...state, district: "Please Remove Leading And Trailing Spaces"}))
		if(name === "district" && value && !validator.isAlpha(value.replaceAll(" ", ""))) setErrors(state => ({...state, district: "Please Enter A Valid District"}))
		if(name === "district" && value.length === value.trim().length && (!value || validator.isAlpha(value.replaceAll(" ", "")))) setErrors(state => ({...state, district: ""}))

		if(name === "state" && value && value.length !== value.trim().length) setErrors(state => ({...state, state: "Please Remove Leading And Trailing Spaces"}))
		if(name === "state" && value && !validator.isAlpha(value.replaceAll(" ", ""))) setErrors(state => ({...state, state: "Please Enter A Valid State"}))
		if(name === "state" && value.length === value.trim().length && (!value || validator.isAlpha(value.replaceAll(" ", "")))) setErrors(state => ({...state, state: ""}))

		if(name === "country" && value && value.length !== value.trim().length) setErrors(state => ({...state, country: "Please Remove Leading And Trailing Spaces"}))
		if(name === "country" && value && !validator.isAlpha(value.replaceAll(" ", ""))) setErrors(state => ({...state, country: "Please Enter A Valid Country"}))
		if(name === "country" && value.length === value.trim().length && (!value || validator.isAlpha(value.replaceAll(" ", "")))) setErrors(state => ({...state, country: ""}))
	}

	const handleChange = (e) => {
		// Character limit section
		if(e.target.name === "name" && e.target.value.length > 14) return

		// Validation Section
		validate(e.target)

		// Update Section
		setData(state => ({...state, [e.target.name]: e.target.value}))
	}

	const handleCollabKeywordsChange = (values) => {
    if(values && values.length > 5) {
      window.alert("You can only select maximum of 5 keywords")
      return
    }
    setData(state => ({...state, collabKeywords: values}))
  }

	const handleUpdate = async () => {
		const error = Object.keys(errors).find((key) => !!errors[key])
		if(error && error !== "workExperience") {
			setSubmitError("Please Verify all the entered fields")
			return
		} else setSubmitError("")

		try {
			const resp = await updateProfile({...data, collabKeywords: data.collabKeywords.map(item => item.value)})
			if(resp.data.success) {
				window.alert("Successfully updated profile")
				await fetchProfile(true)
				navigate("/dashboard/app/profile")
			}
			setSubmitError("")
		}	catch(err) {
			if(err && err.response && err.response.data && err.response.data.message)
				setSubmitError(err.response.data.message)
			console.log(err)
		}	
	}

	const handleRemoveChanges = () => {
		setData(userDetails)
		navigate("/dashboard/app/profile")
	}

	return (
		<div className="">
      <Header />
      <Sidebar />
      <div className="main-content" style={{ overflowX: "hidden", marginBottom: "50px"}}>
						<h1 className="p-3 mt-3 text-primary">Edit Your Profile</h1>
						<div className="d-flex flex-column ">
							<AccountInformation errors={errors} setErrors={setErrors} data={data} handleChange={handleChange} collabKeywords={collabKeywords}/>
							<Row className="px-5">
								<Col md={12}>
								<Form.Group className="form-group mt-2">
										<Form.Label htmlFor="exampleFormControlSelect2">Which type of collaborations looking for <span className="text-secondary">( max 5 )</span></Form.Label>
										<Select
											className="dropdown"
											placeholder="Select upto 5 keywords"
											value={data.collabKeywords} // set selected values
											options={collabKeywords.map((item) => ({label: item.collabTag, value: item._id}))} // set list of the data
											onChange={handleCollabKeywordsChange} // assign onChange function
											isMulti
											isClearable
										/>
									</Form.Group>
								</Col>
							</Row>
							<AdditionalInformation errors={errors} data={data} handleChange={handleChange} userDetails={userDetails}/>
							<ContactInformation errors={errors} data={data} handleChange={handleChange}/>
						</div>
						{
							submitError && (
								<div className="text-danger ms-5">
									{submitError}
								</div>
							)
						}
						<div className="d-flex flex-row align-items-center mt-2">
							<button className="punchred-button ms-5" style={{width: "100px"}} onClick={handleUpdate}>Update</button>
							<button className="btn btn-outline-primary ms-5" style={{height: "40px", width: "100px"}} onClick={handleRemoveChanges}>Cancel</button>
						</div>
      </div>
    </div>
	)
}



export default EditProfile;