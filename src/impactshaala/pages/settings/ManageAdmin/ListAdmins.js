import { Table } from "react-bootstrap";
import { BsTrash3Fill, BsPencilFill, BsBanFill, BsBan } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { listAdmins } from "../../../../api/manageadmins";
import { useEffect, useState } from "react";

const ListAdmins = ({
	data,
	onDelete,
	onDisable,
	onEnable,
}) => {
	console.log(data)

	const questionAlert = (data) => {
		const {
			requestText,
			successText,
			successHeader,
			failureText,
			id,
			type,
 		} = data
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				cancelButton: 'btn btn-outline-primary btn-lg ms-2',
				confirmButton: 'btn btn-primary btn-lg',
			},
			buttonsStyling: false
		})
		
		swalWithBootstrapButtons.fire({
			title: 'Are you sure?',
			text: requestText,
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Yes',
		 
			reverseButtons: false,
			showClass: {
			 popup: 'animate__animated animate__zoomIn'
	 },
	 hideClass: {
			 popup: 'animate__animated animate__zoomOut'
	 }
		 
		}).then(async (result) => {
			if (result.isConfirmed) {
				if(type === "delete") onDelete(id)
				if(type === "disable") onDisable(id)
				if(type === "enable") onEnable(id)
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
			 swalWithBootstrapButtons.fire({
					title: "Request Cancelled!!",
					showClass: {
						popup: 'animate__animated animate__zoomIn'
					},
					hideClass: {
						popup: 'animate__animated animate__zoomOut'
					}
				})
			}
		})
	}

	return (data.length > 0)?(
		<div>
			<Table >
				<thead>
					<tr style={{fontWeight: "bold", fontSize: "14px"}}>
						<td>Sl No</td>
						<td>Name</td>
						<td>Email</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody>
					{
						data && Array.isArray(data) && data.map((item, index) => (
							<tr key={index} style={{background: index % 2 == 0? "#fff": "#f1f1f1"}}>
								<td className="ps-3">{index + 1}</td>
								<td>{item.name}</td>
								<td>{item.authId.email}</td>
								<td className="d-flex flex-row" style={{gap: "5px"}}>
									<Link
										state={item}
										to="/settings/update-admin"
										className="btn btn-light"
									>
										<BsPencilFill />
									</Link>
									<button 
										onClick={() => questionAlert({
											requestText: "You want to delete this user!",
											successText: "User deleted successfully!!!",
											successHeader: "Deleted!",
											id: item.authId._id,
											type: "delete"
										})}
										className="btn btn-light"
									>
										<BsTrash3Fill />
									</button>
									<button 
										onClick={() => questionAlert({
											requestText: "You want to disable this user!",
											successText: "User disabled successfully!!!",
											successHeader: "Disabled!",
											id: item.authId._id,
											type: item.authId.isActive === "ACTIVE"?"disable":"enable"
										})}
										className="btn btn-light"
									>
										{
											item.authId.isActive === "ACTIVE"? (
												// <BsBan />
												"Disable"
											): (
												"Enable"
											) 
										}
									</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</Table>
		</div>
	): (
		<div className="text-center py-5 my-5">
			<h2>No Admins Added</h2>

		</div>
	)
}

export default ListAdmins;