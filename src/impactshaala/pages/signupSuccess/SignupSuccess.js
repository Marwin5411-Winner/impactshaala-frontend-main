import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import Logo from '../../../assets/images/logo.png';

const SignupSuccess = () => {
	return (
		<div className="container mb-24 lg:mb-32">
				<div style={{marginTop: "5rem"}} className="d-flex flex-row justify-content-center">
					<img src={Logo} alt="Logo" style={{width: "200px"}}/>
				</div>
        <h2 
					className="d-flex justify-content-center font-semibold text-center"
					style={{margin: "2rem 0px 3rem 0px", fontSize: "3rem"}}
				>
					Account Creation Successful
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
							<Link to="/login" className="btn btn-outline-primary rounded-pill" style={{width: "150px"}}>Login</Link>
						</div>          
					</div>
        </div>
      </div>
	)
}

export default SignupSuccess;