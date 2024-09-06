import { useState, useEffect } from "react";
import PageTemplate2 from "../../../components/PageTemplate2";
import { Form, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getLocalStorage } from "../../../utilities/localStorage";

const SettingsPage = () => {
	const [user, setUser] = useState()

	useEffect(() => {
		const userData = getLocalStorage('user')
		setUser(userData)
	}, [])
	
	return (
		<PageTemplate2>
			<div className="main-content" style={{ overflowX: "hidden", paddingBottom: "10vh" }}>
				<div>
					<h1 className="p-3 mt-3 text-primary">Settings</h1>
				</div>
				<div className="px-5">
					<div>
						<Link to="/settings/chat-settings">
							<Card className="px-5 py-3 border" style={{boxShadow: "none"}}>
								<h4>Chat Settings</h4>
							</Card>
						</Link>
					</div>
					{
						user && user.accountType === "ORGANIZATION" && (
							<div>
								<Link to="/settings/manage-admins">
									<Card className="px-5 py-3 border" style={{boxShadow: "none"}}>
										<h4>Manage Admins</h4>
									</Card>
								</Link>
							</div>
						)
					}
				</div>
			</div>
		</PageTemplate2>
	)
}

export default SettingsPage;