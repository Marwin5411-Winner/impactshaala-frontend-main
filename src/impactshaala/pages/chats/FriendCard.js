import "./friendscard.css";
import defaultUser from '../../../assets/images/defaultUser.png';

const FriendCard = ({user, setActiveChat, active}) => {
	const {name,unread, profilePic} = user

	const handleSetActiveChat = () => {
		if(active) return
		setActiveChat(user)
	}
	
	return (
		<div className={`py-2 px-3 friend-card ${active && "bg-primary text-white"}`} onClick={handleSetActiveChat} style={{cursor: "pointer"}}>
			<div className="d-flex flex-row justify-content-between align-items-center">
				<div className="d-flex flex-row justify-content-start align-items-center" style={{gap: "10px"}}>
					<div>
						<img src={profilePic?profilePic:defaultUser} alt="Profile Pic" width="30" height="30" className="rounded-circle" style={{objectFit: "cover"}}/>
					</div>
					<span>
						{name}
					</span>
				</div>
				<span className={`bg-primary text-white rounded-circle text-center d-flex flex-column justify-content-center`} style={{fontWeight: "bold", height: "20px", width: "20px", opacity: (unread === 0)?"0":"1"}}>
					{unread}
				</span>

			</div>
		</div>
	)
}

export default FriendCard;