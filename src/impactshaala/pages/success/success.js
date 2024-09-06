import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Logo from '../../../assets/images/logo.png';

const Success = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [prompt, setPrompt] = useState("")

	useEffect(() => {
		if(location.state) {
			setPrompt(location.state.prompt)
		} 
		else navigate("/dashboard")
	}, [])

	return (
		<div>
			<Header />
			<div className="container mb-24 lg:mb-32">
					<div style={{marginTop: "5rem"}} className="d-flex flex-row justify-content-center">
						<img src={Logo} alt="Logo" style={{width: "200px"}}/>
					</div>
					<h2 
						className="d-flex justify-content-center font-semibold text-center"
						style={{margin: "2rem 0px 3rem 0px", fontSize: "3rem"}}
					>
						{prompt}
					</h2>
					<div>
						<div>
							<div className="d-flex flex-row justify-content-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={100} height={100} version="1.1" id="Capa_1" viewBox="0 0 50 50" xmlSpace="preserve">
											<circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25" />
											<polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points="38,15 22,33 12,25" />
									</svg>
							</div>
							<div className="text-center mt-5">
								<Link to={(location.state.path)?location.state.path:"/dashboard"} className="btn btn-outline-primary rounded-pill" style={{width: "150px"}}> Next </Link>
							</div>
						</div>
					</div>
				</div>
		</div>
	)
}

export default Success;