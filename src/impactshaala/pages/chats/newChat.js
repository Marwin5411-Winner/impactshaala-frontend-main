import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { getLocalStorage } from '../../../utilities/localStorage';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import { Row, Col, Form } from 'react-bootstrap';
import ChatArea from './chatArea';
import FriendCard from './FriendCard';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { blockUser, reportUser, sendMessage, unblockUser } from '../../../api/chat';
import { stagingSocketURL, localSocketURL } from '../../../utilities/socket';

const Chat = () => {
	const [currentUser, setCurrentUser] = useState({})
	const [userSocket, setUserSocket] = useState()
	const [activeChat, setActiveChat] = useState("")
	const [friends, setFriends] = useState([])
	const [messages, setMessages] = useState([]);
	const [blocked, setBlocked] = useState(null)
	const [loading, setLoading] = useState(false);
	const [messageLoading, setMessageLoading] = useState(false)
	const [onlineStatus, setOnlineStatus] = useState("")
	const [search, setSearch] = useState("")

	const handleSendMessage = async ({message, attachment}) => {
		const data = {
			senderId: currentUser.authId._id,
			receiverId: activeChat,
			message,
			attachment: attachment.file,
			extension: attachment.extension
		}
		// setMessages(state => [...state, {...data, encryptedContent: message, createdAt: Date.now(), attachment}])
		setMessageLoading(true)
		try {
			const res = await sendMessage(data)
			setMessageLoading(false)
			if(res.errRes) {
				window.alert(res.errRes.data.message)
			}
			if(res.data && res.data.success) {
				setMessages(state => [...state, res.data.data])
				userSocket.emit('message', res.data.data)
			} 
		} catch(err) {
			console.log(err)
		}
		
	}

	const handleReceiveMessage = useCallback((data) => {
		if(activeChat !== data.senderId)
			setFriends(state => {
				return state.map((friend, index) => {
					return friend.authId._id === data.senderId ? {
						...friend,
						unread: friend.unread + 1
					}: friend
				})
			})
		setMessages(state => [...state, data])
	}, [activeChat])

	useEffect(() => {
		const env = process.env.REACT_APP_ENV 
		const url = (env === "local")?localSocketURL:stagingSocketURL
		const socket = io(url)

		setUserSocket(socket);
		const user = getLocalStorage("user")
		setCurrentUser(user)

		socket.emit("start-chat", {_id: user.authId._id})
		socket.on('get-messages', (data) => {
			setLoading(false)
			setMessages(data.messages)
			setOnlineStatus(data.online)
		})
		
		socket.on("friendList", (data) => {
			setFriends(data.map((item) => ({...item, unread: 0, messages: []})))
		})

		socket.on("check-blocked", (data) => {
			if(data.success) {
				setBlocked({
					...data
				})
			} else setBlocked(null)
		})

		socket.on("is-online", (data) => setOnlineStatus(data))
	}, [])

	useEffect(() => {
		if(userSocket && handleReceiveMessage) {
			userSocket.on('message', handleReceiveMessage)
		}
	}, [userSocket, handleReceiveMessage])

	const handleSetActiveChat = (user) => {
		// Removing the callback previously set
		setLoading(true)
		if(userSocket && handleReceiveMessage) {
			userSocket.off('message', handleReceiveMessage)
			userSocket.emit('get-messages', {senderId: currentUser.authId._id, receiverId: user.authId._id})
		}

		// Updating the messages
		setFriends(state => {
			return state.map(item => {
				return item.authId._id === user.authId._id ? {
					...item,
					unread: 0,
				}:{...item}
			})
		})

		// Checking if user is blocked

		userSocket.emit("check-blocked", {senderId: currentUser.authId._id, receiverId: user.authId._id})

		// Updating the active chat
		setActiveChat(user.authId._id)
	}

	const handleReportUser = async () => {
		try {
			const resp = await reportUser(activeChat)
			if(resp.data.success) {
				window.alert(resp.data.message)
			}
		} catch(err) {
			if(err && err.response && err.response.data.message) {
				window.alert(err.response.data.message)
				return
			}
			window.alert(err.message)
		}
	}

	const handleBlockUser = async () => {
		try {
			const resp = await blockUser(activeChat)
			if(resp.data.success) {
				userSocket.emit("check-blocked", {senderId: currentUser.authId._id, receiverId: activeChat})
				window.alert(resp.data.message);
			}
		} catch(err) {
			window.alert(err.message)
		}
	}

	const handleUnBlockUser = async () => {
		try {
			const resp = await unblockUser(activeChat)
			if(resp.data.success) {
				userSocket.emit("check-blocked", {senderId: currentUser.authId._id, receiverId: activeChat})
				setBlocked(null)
				window.alert(resp.data.message);
			}
		} catch(err) {
			window.alert(err.message)
		}	
	}

	return (
		<div className="d-flex flex-column" style={{width: "100vw", height: "100vh", maxHeight: "100vh"}}>
			<div style={{flexShrink: "0"}}>
				<Header />
			</div>
			<div style={{flexGrow: '1'}}>
				<Row className="w-100 h-100" style={{maxHeight: "calc(100vh - 70px)"}}>
					<Col md={3}>
						<div className="mt-2 px-2 d-flex flex-row justify-content-start align-items-center" style={{gap: "10px"}}>
							<Link to={-1}>
								<BsChevronLeft className="h-100" style={{width: "20px", height: "20px"}}/>
							</Link>
							<h2>Chat </h2>
						</div>
						<div className="chat-searchbar px-2 mt-2" >
							<Form.Group className="form-group chat-search-data m-0 d-flex flex-row justify-content-start">
								<input type="text" className="form-control round" id="chat-search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
								<div className="position-relative" style={{paddingTop: "5px"}}>
									<i className="material-symbols-outlined position-absolute" style={{right: "5px"}}>
										search
									</i>
								</div>
							</Form.Group>
						</div>
						<div className="px-2 pt-4 d-flex justify-content-start flex-column">
							{
								friends && Array.isArray(friends) && friends.filter(friend => friend.name.toLowerCase().includes(search.toLowerCase())).map((friend, index) => (
									<FriendCard active={friend.authId._id === activeChat} key={index} user={friend} setActiveChat={handleSetActiveChat}/>
								))
							}
						</div>
					</Col>
					<Col md={9} className='chat-data p-0 h-100 position-relative'>
						{
							!activeChat && (
								<div className="position-absolute text-center" style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
									<h3>
										Choose the collaborator<br/> you want to chat with
									</h3>
									<button className="btn btn-primary py-2 mt-3 px-5 rounded-pill">Search Collaborator</button>
								</div>
							)
						}
						{
							activeChat && (
								<ChatArea 
									user={friends.find(item => item.authId._id === activeChat)} 
									handleSendMessage={handleSendMessage} 
									messages={messages} 
									reportUser={handleReportUser}
									blockUser={handleBlockUser}
									unblockUser={handleUnBlockUser}
									blocked={blocked}
									loading={loading}
									onlineStatus={onlineStatus}
									currentUser={currentUser}
									messageLoading={messageLoading}
								/>
							)
						}
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Chat;