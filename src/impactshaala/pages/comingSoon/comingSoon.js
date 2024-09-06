import comingSoon from '../../../assets/images/coming_soon.jpg'
import Logo from '../../../assets/images/logo.png';

const ComingSoon = () => {
	return (
		<div className="d-flex flex-row justify-content-center" style={{height: "100vh", width: "100vw"}}>
			<div className="d-flex flex-column justify-content-center px-5" style={{maxWidth: "300px"}}>
				<div>
					<img src={Logo} alt="Logo" style={{width: "100%"}}/>
					<img src={comingSoon} alt="Coming Soon" style={{width: "100%"}}/>
				</div>
			</div>
		</div>
	)
}

export default ComingSoon;