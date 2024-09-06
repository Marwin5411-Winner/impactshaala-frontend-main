import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import WarningPopup from "../../../components/WarningPopup";

const CollabRequestCard = ({
	data,
	type
}) => {
	const { image, friends, name } = data
	const [btns, setBtns] = useState({
		primary: "", 
		secondary: "",
		tertiary: ""
	})
	const [showWarning, setShowWarning] = useState(false)

	useEffect(() => {
		if(type == "sent") setBtns({secondary: "Cancel"})
		if(type == "received") setBtns({primary: "Confirm", secondary: "Delete Request"})
		if(type == "accepted") setBtns({})
		if(type == "rejected") setBtns({})
		if(type == "dropped") setBtns({tertiary: "View Profile"})


	}, [type])

	const questionAlert = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				cancelButton: 'btn btn-outline-primary btn-lg ms-2',
				confirmButton: 'btn btn-primary btn-lg',
				
				
			},
			buttonsStyling: false
		})
		
		swalWithBootstrapButtons.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'cancel',
			confirmButtonText: 'Yes, delete it!',
		 
			reverseButtons: false,
			showClass: {
			 popup: 'animate__animated animate__zoomIn'
	 },
	 hideClass: {
			 popup: 'animate__animated animate__zoomOut'
	 }
		 
		}).then((result) => {
			if (result.isConfirmed) {
				swalWithBootstrapButtons.fire({
					title: 'Deleted!',
					text: 'Your Request has been deleted.',
					icon: 'success',
					showClass: {
						popup: 'animate__animated animate__zoomIn'
					},
					hideClass: {
						popup: 'animate__animated animate__zoomOut'
					}
				})
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
			 swalWithBootstrapButtons.fire({
					title: 'Your Request is safe!',
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

	const handlePrimaryClick = () => {
		if(btns.primary === "Confirm") {
			setShowWarning(true)
		}
	}

	return (
		<li className="d-flex align-items-center  justify-content-between flex-wrap">
			<WarningPopup 
				show={showWarning} 
				close={() => setShowWarning(false)} 
				handleAccept={() => {window.alert("Accepting Request")}}
			/>
      <div className="user-img img-fluid flex-shrink-0">
         <img src={image} alt="story-img" className="rounded-circle avatar-40"/>
      </div>
      <div className="flex-grow-1 ms-3">
         <h6>{name}</h6>
         <p className="mb-0">{friends}</p>
      </div>
      <div className="d-flex align-items-center mt-2 mt-md-0">
         <div className="confirm-click-btn">
						{
							btns.primary && (
								<button className="me-3 btn btn-primary rounded-pill" onClick={handlePrimaryClick}>{btns.primary}</button>
							)
						}
						{
							btns.secondary && (
								<Link to="#" onClick={questionAlert} className="btn btn-danger rounded-pill" data-extra-toggle="delete" data-closest-elem=".item">{btns.secondary}</Link>
							)
						}
						{
							btns.tertiary && (
								<Link to="#" onClick={questionAlert} className="btn btn-outline-primary rounded-pill" data-extra-toggle="delete" data-closest-elem=".item">{btns.tertiary}</Link>
							)
						}
         </div>
      </div>
    </li>
	)
}

export default CollabRequestCard