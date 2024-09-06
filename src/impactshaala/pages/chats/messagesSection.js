import defaultUser from '../../../assets/images/defaultUser.png';
import Attachment from './Attachment';

const MessagesSection = ({messages, user, blocked, currentUser}) => {
	return (
		<div className="p-4">
			{
				messages && Array.isArray(messages) && messages.map((item, index) => {
					const message = item.encryptedContent
					const attachment = item.attachment
					const time = (new Date(item.createdAt)).toLocaleTimeString("en-IN", {hour: "numeric", minute: "2-digit"})
					return (item.senderId === user.authId._id)?(
						<div className="chat chat-left" key={index}>
							<div className="chat-user">
								<div className="avatar m-0" style={{width: "40px", height: "40px"}}>
									<img loading="lazy" src={(user.profilePic)?user.profilePic:defaultUser} alt="avatar" className="avatar-35 rounded-circle w-100 h-100" style={{objectFit: "cover"}}/>
								</div>
								<span className="chat-time mt-1">{time}</span>
							</div>
							<div className="chat-detail" style={{maxWidth: "350px"}}>
								<div className="chat-message bg-white text-black">
									<Attachment attachment={attachment}/>
									<div>
										{message}
									</div>
								</div>
							</div>
						</div>
					):(
						<div className="chat chat d-flex other-user">
							<div className="chat-user">
								<div className="avatar m-0" style={{width: "40px", height: "40px"}}>
									<img loading="lazy" src={currentUser.profilePic?currentUser.profilePic:defaultUser} alt="avatar" className="avatar-35 rounded-circle w-100 h-100" style={{objectFit: "cover"}}/>
								</div>
								<span className="chat-time mt-1">{time}</span>
							</div>
							<div className="chat-detail" style={{maxWidth: "350px"}}>
								<div className="chat-message">
									<Attachment attachment={attachment}/>
									<div className="text-start">
										{message}
									</div>
								</div>
							</div>
						</div>
					)
				})
			}
			{
				blocked && (
          <div className="text-center py-3" style={{fontSize: "14px"}}>
            {blocked.message}
          </div>
        )
			}
		</div>
	)
} 

export default MessagesSection;