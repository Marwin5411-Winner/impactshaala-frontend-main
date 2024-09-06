import PageTemplate2 from "../../../../components/PageTemplate2";
import { BsChevronRight } from "react-icons/bs";
import { Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { chatSettingconfigOptions, listMyChatSettings, updateChatSettings } from "../../../../api/chatSettings";
import { Link } from "react-router-dom";

const ChatSettings = () => {
	const [settingsList, setSettingsList] = useState([])
	const [selected, setSelected] = useState(null)

	const fetchChatSettings = async () => {
		try {
			const res = await chatSettingconfigOptions()
			if(res.data?.success) setSettingsList(res.data.data)
		} catch(err) {
			console.log(err)
		}

		try {
			const res = await listMyChatSettings()
			if(res.data?.success) {
				setSelected(res.data.data.receiveMessagesFrom)
				console.log(res.data)
			}
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchChatSettings()
	}, [])

	const handleChange = (value) => {
		setSelected(value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const resp = await updateChatSettings({chat_setting: selected})
			if(resp.data.success)
				window.alert(resp.data.message)
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<PageTemplate2>
			<div className="main-content" style={{ overflowX: "hidden", paddingBottom: "10px" }}>
				<div className="d-flex flex-row justify-content-start">
					<Link to="/settings">
						<h1 className="p-3 mt-3 text-primary" style={{textDecoration: "underline"}}>Settings</h1>
					</Link>					
					<BsChevronRight className="mt-3" style={{width: "25px", height: "auto"}}/>
					<h1 className="p-3 mt-3 text-primary">Chat Settings</h1>
				</div>
			</div>
			<div className="px-5">
				<div className="form-group mt-3 d-flex flex-column" key={"chat-setting"}>
					{
						settingsList && Array.isArray(settingsList) && settingsList.map((item, index) => {
							return (
								<Form.Check 
									key={index}
									className="form-check" 
									id={`chat-setting-${index}`} 
									name="chat-setting"
									type="radio" 
									label={item.chat_settings}
									checked={item.enum === selected}
									onChange={() => handleChange(item.enum)}
								/>
							)
						})
					}
				</div>
				<button className="btn punchred-button mt-3" onClick={handleSubmit}>
					Update
				</button>
			</div>
		</PageTemplate2>
	)
}

export default ChatSettings;