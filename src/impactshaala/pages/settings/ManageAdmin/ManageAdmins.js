import PageTemplate2 from "../../../../components/PageTemplate2"
import ListAdmins from "./ListAdmins";
import { Row, Col, Card } from 'react-bootstrap';
import { BsChevronRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { deleteAdmin, disableAdmin, listAdmins } from "../../../../api/manageadmins";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { enableAdmin } from "../../../../api/manageadmins";

const ManageAdmins = () => {
	const navigate = useNavigate()
	const [list, setList] = useState([])

	const handleDelete = async (id) => {
		const resp = await deleteAdmin(id)
		if(resp.errRes) {
			window.alert(resp.errRes.response.data.message)
			return
		}
		if(!resp.data.success) {
			window.alert(resp.data.message)
			return
		}
		navigate("/dashboard/success", {
			state: {
				prompt: resp.data.message,
				path: "/settings/manage-admins"
			}
		})	
	}

	const handleDisable = async (id) => {
		const resp = await disableAdmin(id)
		if(resp.errRes) {
			window.alert(resp.errRes.response.data.message)
			return
		}
		if(!resp.data.success) {
			window.alert(resp.data.message)
			return
		}
		navigate("/dashboard/success", {
			state: {
				prompt: resp.data.message,
				path: "/settings/manage-admins"
			}
		})	
	}

	const handleEnable = async (id) => {
		const resp = await enableAdmin(id)
		if(resp.errRes) {
			window.alert(resp.errRes.response.data.message)
			return
		}
		if(!resp.data.success) {
			window.alert(resp.data.message)
			return
		}
		navigate("/dashboard/success", {
			state: {
				prompt: resp.data.message,
				path: "/settings/manage-admins"
			}
		})	
	}

	const fetchAdminList = async () => {
		const resp = await listAdmins()
		if(resp.errRes) {
			if(resp.errRes.response) {
				console.log(resp.errRes.response.data.message)
				return
			}
			if(resp.message) {
				console.log(resp.message)
			}
		}
		if(!resp.data.success) {
			window.alert(resp.data.message)
		} else {
			console.log(resp.data)
			setList(resp.data.data.admins)	
		}
	}

	useEffect(() => {
		fetchAdminList()
	}, [])

	return (
		<PageTemplate2>
			<div className="main-content" style={{ overflowX: "hidden", paddingBottom: "10px" }}>
				<div className="d-flex flex-row justify-content-start">
					<Link to="/settings">
						<h1 className="p-3 mt-3 text-primary" style={{textDecoration: "underline"}}>Settings</h1>
					</Link>
					<BsChevronRight className="mt-3" style={{width: "25px", height: "auto"}}/>
					<h1 className="p-3 mt-3 text-primary">Manage Admins</h1>
				</div>
			</div>

			<div className="px-5" style={{paddingBottom: "50px"}}>
				<Card className="p-5">
					<Row>
						<Col md="6"></Col>
						<Col md="6" className="d-flex justify-content-end">
							<Link to="/settings/add-admin" className="btn btn-success">Add Admin</Link>
						</Col>
					</Row>
					<ListAdmins 
						data={list}
						onDisable={handleDisable}
						onEnable={handleEnable}
						onDelete={handleDelete}
					/>

				</Card>
			</div>
		</PageTemplate2>
	)
}

export default ManageAdmins