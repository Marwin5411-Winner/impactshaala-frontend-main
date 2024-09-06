import { useState, useEffect } from 'react';
import PageTemplate2 from '../../../../components/PageTemplate2';
import AdminForm from './AdminForm';
import { BsChevronRight } from 'react-icons/bs';
import validator from 'validator';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { updateAdmin } from '../../../../api/manageadmins';

const UpdateAdmin = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [data, setData] = useState({
		name: "",
		email: "", 
		password: "",
		confirmPassword: ""
	})
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword:"",
		misc: "",
	})
	const [userData, setUserData] = useState(null)

	const validate = ({name, value}) => {
		if(name === "name" && value.trim().length !== value.length) {setErrors(state => ({...state, name: "Please Remove Leading And Trailing Spaces"})); return}
		if(name === "name" && !validator.isAlpha(value.replaceAll(" ", "")))  {setErrors(state => ({...state, name: "Please Enter A Valid Name"})); return}
		if(name === "name" && (!value || validator.isAlpha(value.replaceAll(" ", "")))) {setErrors(state => ({...state, name: ""})); return}

		if(name === "email" && !validator.isEmail(value.toLowerCase())) {setErrors(state => ({...state, email: "Please Enter A Valid Email"})); return}
		if(name === "email" && validator.isEmail(value.toLowerCase())) {setErrors(state => ({...state, email: ""})); return}

		if(name === "password" && value.trim().length !== value.length) {setErrors(state => ({...state, password: "Please Remove Leading and Trailing Spaces"})); return}
		if(name === "password" && !!value) {setErrors(state => ({...state, password: ""})); return}

		if(name === "confirmPassword" && !!data.password && !value) {setErrors(state => ({...state, confirmPassword: "Please Confirm Password"})); return}
		if(name === "confirmPassword" && value.trim().length !== value.length) {setErrors(state => ({...state, confirmPassword: "Please Remove Leading And Trailing Spaces"})); return}
		if(name === "confirmPassword" && value != data.password) {setErrors(state => ({...state, confirmPassword: "Passwords don't match"})); return}
		if(name === "confirmPassword" && !!value && value === data.password) {setErrors(state => ({...state, confirmPassword: ""}))}
	}

	const handleUpdateAdmin = async () => {
		if(!data.name) {
			setErrors(state => ({...state, name: "Please Enter A Name"}))
			window.alert("Please Enter A Name");
			return;
		}
		if(!data.email) {
			setErrors(state => ({...state, email: "Please Enter An Email ID"}))
			window.alert("Please Enter An Email Id");
			return
		}

		const error = Object.keys(errors).find(key => !!errors[key])
		if(error) {
			window.alert(errors[error])
			return;
		}

		const info = {
			name: data.name,
			authId: {
				...userData.authId,
			}
		}

		if(data.password) info.authId.password = data.password

		const resp = await updateAdmin(info)
		if(resp.errRes) {
			if(resp.errRes.response) {
				window.alert(resp.errRes.response.data.message)
				return
			}
			if(resp.message) {
				console.log(resp.message)
				return
			}
			console.log(resp)
			return			
		}
		if(!resp.data.success) {
			window.alert(resp.data.message);
			return
		} 
		
		navigate("/dashboard/success", {
			state: {
				prompt: resp.data.message,
				path: "/settings/manage-admins"
			}
		})
	}

	const handleChange = (e) => {
		if(e.target.name === "name" && e.target.value.length > 14) {return}
		if(e.target.name === "password" && e.target.value.length > 14) return;
		if(e.target.name === "confirmPassword" && e.target.value.length > 14) return;

		validate(e.target)
		setData(state => ({...state, [e.target.name]: e.target.value}))
	}

	useEffect(() => {
		const userDetails = location.state
		setUserData(userDetails)
		setData({
			name: userDetails.name,
			email: userDetails.authId.email,
			password: "",
			confirmPassword: "",
		})
	}, [])

	return !!location.state?(
		<PageTemplate2>
			<div className="main-content" style={{ overflowX: "hidden", paddingBottom: "10px" }}>
				<div className="d-flex flex-row justify-content-start">
					<h1 to="/settings" className="p-3 mt-3 text-primary">Settings</h1>
					<BsChevronRight className="mt-3" style={{width: "25px", height: "auto"}}/>
					<h1 className="p-3 mt-3 text-primary">Update Admin</h1>
				</div>
			</div>

			<div className="px-5">
				<AdminForm 
					formHeading={"Update Admin"}
					data={data}
					onChange={handleChange}
					onSubmit={handleUpdateAdmin}
					submitButtonText="Update"
					errors={errors}
				/>
			</div>
		</PageTemplate2>
	): (<Navigate to="/settings/manage-admins"/>)
}

export default UpdateAdmin