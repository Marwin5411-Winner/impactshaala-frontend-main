import { Dropdown, Form, Button } from "react-bootstrap";
import CustomToggle from '../../../components/dropdowns'
import { Link } from "react-router-dom";
import MessagesSection from "./messagesSection";
import { useState, useRef, useEffect } from 'react';

import defaultUser from '../../../assets/images/defaultUser.png';
import attachmentIcon from '../../../assets/images/attachment.svg';
import pdfIcon from '../../../assets/images/pdf.png';
import {ReactComponent as DeleteIcon} from '../../../assets/images/delete.svg';

const ChatArea = ({
  user, 
  handleSendMessage, 
  messages, 
  reportUser, 
  blockUser, 
  unblockUser, 
  blocked, 
  loading, 
  onlineStatus, 
  currentUser,
  messageLoading,
}) => {
  const [input, setInput] = useState("")
  const [attachment, setAttachment] = useState("")
  const [preview, setPreview] = useState(null)
  const messagesRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(input.trim() || attachment) {
      handleSendMessage({message: input.trim(), attachment})
      setInput("")
      setAttachment("")
      setPreview(null)
    }
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }

  const handleFileChange = (e) => {
    if(e.target.files[0]) {
      const file = e.target.files[0]

      const maxSize = 2 * 1024 * 1024; // 1MB, adjust as needed

      if (file.size > maxSize) {
        alert('File size exceeds the maximum allowed size (2 MB)');
        // Optionally, you can clear the file input
        e.target.value = null;
        return;
      }

      const reader = new FileReader()

      reader.onload = (event) => {
        const string = event.target.result;
        setAttachment({
          file: string,
          extension: file.name.split(".").slice(-1)[0]
        })
        if(file.type.includes("pdf")) {
          setPreview({
            image: pdfIcon,
            label: file.name
          })
          return
        }
        if(file.type.includes("image")) {
          setPreview({
            image: string,
            label: file.name
          })
          return
        }
        if(file.type.includes("video")) {
          setPreview({
            video: string,
            label: file.name
          })
        }
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

	return (!loading)?(
		<div className="d-flex flex-column justify-content-between h-100">
			<header className="d-flex justify-content-between align-items-center bg-white pt-3 ps-3 pe-3 pb-3" style={{flexShrink: 0}}>
        <div className="d-flex align-items-center">
        	<div className="avatar chat-user-profile m-0 me-3">
        	  <img loading="lazy" src={user.profilePic?user.profilePic:defaultUser} alt="avatar" className="avatar-50" style={{borderRadius: "100px"}}/>
        	  {/* <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span> */}
        	</div>
          <div className="d-flex flex-column justify-content-end">
        	  <h5 className="mb-0">{user?.name}</h5>
            <div>{onlineStatus}</div>
          </div>
        </div>
        <div className="chat-header-icons d-flex">  
          <Dropdown className="bg-soft-primary d-flex justify-content-center align-items-center" as="span">
            <Dropdown.Toggle as={CustomToggle} variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show">
              more_vert
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
            {/* <Dropdown.Item className="d-flex align-items-center" href="#"><i className="material-symbols-outlined md-18 me-1">delete_outline</i>Delete chat</Dropdown.Item> */}
              <Dropdown.Item className="d-flex align-items-center" onClick={reportUser}><i className="material-symbols-outlined md-18 me-1">watch_later</i>Report</Dropdown.Item>
              { !blocked && (<Dropdown.Item className="d-flex align-items-center" onClick={blockUser}><i className="material-symbols-outlined md-18 me-1">watch_later</i>Block</Dropdown.Item>)}
              { blocked && blocked.receiverId === user.authId._id && (
                <Dropdown.Item className="d-flex align-items-center" onClick={unblockUser}><i className="material-symbols-outlined md-18 me-1">watch_later</i>Unblock</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
			<div style={{flexGrow: "1", overflow: "auto"}} ref={messagesRef}>
				<MessagesSection messages={messages} user={user} blocked={blocked} currentUser={currentUser}/>
			</div>
      {
        !blocked && (
          <div className="chat-footer p-3 bg-white">
            {
              preview && (
                <div 
                  className="d-flex flex-row justify-content-start ps-3 pe-3 pb-3"
                  style={{
                    gap: "10px"
                  }}
                >
                  <div className="d-flex flex-column justify-content-center">
                    <button style={{border: "", outline: "none", borderRadius: "100px", width: "40px", height: "40px"}} onClick={() => handleFileChange({target: {files: []}})}>
                      <DeleteIcon className="" style={{fill: "black", width: "100%", height: "100%"}}/>
                    </button>
                  </div>
                  {
                    preview.image ? (
                      <img 
                        src={preview.image} 
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          borderRadius: "10px",
                          background: "#f9f9f9",
                          boxShadow: "0 0 20px #eee inset"
                        }}
                      />
                    ): (
                      <video 
                        src={preview.video}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          borderRadius: "10px",
                          background: "#f9f9f9",
                          boxShadow: "0 0 20px #eee inset"
                        }}
                        muted
                      >
                      </video>
                    )
                  }
                  <div style={{fontSize: "14px"}}>{preview.label}</div>
                </div>
              )
            }
            <Form className="d-flex align-items-center" onSubmit={e => e.preventDefault()}>
              <button className="position-relative" style={{border: "none", background: "transparent"}}>
                <Form.Control 
                  type="file" 
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: "0",
                    top: "0",
                    left: "0",
                  }}
                  onChange={handleFileChange}
                  accept="image/*, .mp4, .pdf, .doc"
                />
                <img src={attachmentIcon} alt="Attachment"/>
              </button>
              <Form.Control rows={1} as="textarea" className="me-3" placeholder="Type your message" value={input} onChange={handleChange} disabled={messageLoading}/>
              <Button onClick={handleSubmit} disabled={messageLoading} type="button" variant="primary d-flex align-items-center">Send</Button>
            </Form>
          </div>
        )
      }
		</div>
	): (
    <div className="h-100 text-center d-flex flex-column justify-content-center">
      <div className="text-center">
        <img src="/loader.svg" alt="Loading..."/>
      </div>
    </div>
  )
}

export default ChatArea;