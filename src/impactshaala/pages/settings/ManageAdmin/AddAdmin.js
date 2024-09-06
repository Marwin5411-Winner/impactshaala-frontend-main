import { useState } from 'react';
import PageTemplate2 from '../../../../components/PageTemplate2';
import AdminForm from './AdminForm';
import { BsChevronRight } from 'react-icons/bs';
import validator from 'validator';
import { addAdmin } from '../../../../api/manageadmins';
import { useNavigate } from 'react-router-dom';
import { checkIfEmailNotTaken } from '../../../../api/onboarding';

const AddAdmin = () => {
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

	const handleAddAdmin = async () => {
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
		if(!data.password) {
			setErrors(state => ({...state, password: "Please Enter A Password"}))
			window.alert("Please Enter A Password");
			return;
		}

		const error = Object.keys(errors).find(key => !!errors[key])
		if(error) {
			window.alert(errors[error])
			return;
		}

		const resp = await addAdmin(data)
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

	const validate = ({name, value}) => {
		if(name === "name" && value.trim().length !== value.length) {setErrors(state => ({...state, name: "Please Remove Leading And Trailing Spaces"})); return}
		if(name === "name" && !validator.isAlpha(value.replaceAll(" ", "")))  {setErrors(state => ({...state, name: "Please Enter A Valid Name"})); return}
		if(name === "name" && (!value || validator.isAlpha(value.replaceAll(" ", "")))) {setErrors(state => ({...state, name: ""})); return}

		if(name === "email" && !validator.isEmail(value.toLowerCase())) {setErrors(state => ({...state, email: "Please Enter A Valid Email"})); return}
		if(name === "email" && validator.isEmail(value.toLowerCase())) {setErrors(state => ({...state, email: ""})); return}

		if(name === "password" && !value) {setErrors(state => ({...state, password: "Password is Mandatory"}))}
		if(name === "password" && value.trim().length !== value.length) {setErrors(state => ({...state, password: "Please Remove Leading and Trailing Spaces"})); return}
		if(name === "password" && !!value) {setErrors(state => ({...state, password: ""})); return}

		if(name === "confirmPassword" && !value) {setErrors(state => ({...state, confirmPassword: "Please Confirm Password"}))}
		if(name === "confirmPassword" && value.trim().length !== value.length) {setErrors(state => ({...state, confirmPassword: "Please Remove Leading And Trailing Spaces"})); return}
		if(name === "confirmPassword" && value != data.password) {setErrors(state => ({...state, confirmPassword: "Passwords don't match"})); return}
		if(name === "confirmPassword" && !!value && value === data.password) {setErrors(state => ({...state, confirmPassword: ""}))}
	}

	const handleChange = (e) => {
		if(e.target.name === "name" && e.target.value.length > 14) return;
		if(e.target.name === "password" && e.target.value.length > 14) return;
		if(e.target.name === "confirmPassword" && e.target.value.length > 14) return;
		validate(e.target)

		setData(state => ({...state, [e.target.name]: e.target.value}))
	}

  const handleCheckEmailAvailable = async () => {
    if(data.email) {
      if(!validator.isEmail(data.email.toLowerCase())) return;

      const isEmailNotTaken = await checkIfEmailNotTaken(data.email.toLowerCase())
      if(!isEmailNotTaken.success) {
        setErrors(state => ({...state, email: isEmailNotTaken.message}))
        return;
      } else setErrors({...errors, email: ""})
    }
  }

	return (
		<PageTemplate2>
			<div className="main-content" style={{ overflowX: "hidden", paddingBottom: "10px" }}>
				<div className="d-flex flex-row justify-content-start">
					<h1 className="p-3 mt-3 text-primary">Settings</h1>
					<BsChevronRight className="mt-3" style={{width: "25px", height: "auto"}}/>
					<h1 className="p-3 mt-3 text-primary">Add Admin</h1>
				</div>
			</div>

			<div className="px-5">
				<AdminForm 
					formHeading={"Create Admin"}
					data={data}
					errors={errors}
					onChange={handleChange}
					onSubmit={handleAddAdmin}
					submitButtonText="Add"
					handleCheckEmailAvailable={handleCheckEmailAvailable}
				/>
			</div>
		</PageTemplate2>
	)
}

export default AddAdmin;