const LogoutPopup = ({
	logout,
	cancel,
	show
}) => {
	return show?(
		<div style={{
			position: "fixed",
			top: "0px",
			left: "0px",
			zIndex: "1112",
			width: "100%",
			height: "100%",
		}}>
			<div style={{
				background: "black",
				opacity: "0.5",
				position: "absolute",
				width: "100vw",
				height: "100vh",
				top: "0px",
				left: "0px",
			}}
				onClick={cancel}
			></div>

			<div style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				maxWidth: "300px",
				background: "white",
				padding: "20px",
				boxShadow: "2px 2px 10px #ccc",
				borderRadius: "10px",
			}}>
				<h4 className="text-center">
					Are you sure you want to Logout?
				</h4>
				<div className="d-flex flex-row justify-content-evenly mt-4">
					<button onClick={logout} className="btn btn-outline-primary bg-primary text-white" style={{width: "100px", borderRadius: "100px", fontWeight: "700"}}>
						Yes
					</button>
					<button onClick={cancel} className="btn-outline-primary bg-white" style={{width: "100px", fontWeight: "700", borderRadius: "100px", borderWidth: "1px"}}>
						No
					</button>
				</div>
			</div>
		</div>
	): null
}

export default LogoutPopup;