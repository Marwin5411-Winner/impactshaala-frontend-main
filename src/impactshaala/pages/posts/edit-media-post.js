import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../components/partials/dashboard/SidebarStyle/sidebar';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import { updateMediaPost } from '../../../api/mediaPost';

const EditMediaPost = () => {
	const navigate = useNavigate()
	const location = useLocation()
   
	const [errors, setErrors] = useState({
		description: "",
		misc: "",
	})

	const [post, setPost] = useState({
		description: "",
		image: []
	})

  const [showPopup, setShowPopup] = useState(false)

	const handleEditPost = async (e) => {
		e.preventDefault();
		const resp = await updateMediaPost({description: post.description}, post._id)
		if(resp.errRes) {
			if(resp.errRes.response) {
				setErrors(state => ({...state, misc: resp.errRes.response.data.message}))
				return
			}
			console.log(resp)
			return
		}
		if(resp.data.success) {
			navigate("/dashboard/success", {
				state: {
					prompt: resp.data.message,
					path: "/dashboard/app/profile#posts-tab"
				}
			})	        
		}
	}

	const handleChange = (e) => {
		setPost(state => ({...state, description: e.target.value}))
	}

	useEffect(() => {
		if(location.state) setPost(location.state)
		else navigate(-1)
	}, [])

	return (
		<div className="max-vw-100" style={{overflow: "hidden"}}>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Card style={{ minHeight: "80vh" }}>
            <Card.Header>
              <h3 className="">
                Create post /{" "}
                <span style={{ color: "#FCBF49" }}>
                  <small>Media</small>
                </span>
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center mt-5">
                <div className="w-100 ">
                  <Row>
                    <Col md="6">
                      <Form id="form-wizard3" className="text-start">
                        <fieldset>
                          <div className=" ">
                            <Row>
                              {post && post.image && post.image.map((image, index) => (
                                <Col md="12" key={index} className="my-2">
                                    <div
                                      className=""
                                      style={{
                                        width: "100%",
                                        height: "300px",
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "300px",
                                          objectFit: "contain",
                                        }}
                                        className="border border-primary rounded text-center cursor-pointer"
                                        src={image}
                                        alt="Preview"
                                      />
                                    </div>
                                </Col>
                              ))}
                            </Row>
                            <Row>
                              <Col md="12" className="my-2 ">
                                <Form.Group className="form-group">
                                  <Form.Label>Provide a caption (optional)</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Provide caption for the post"
                                    style={{minHeight:"31vh", width: "100%"}}
                                    value={post.description}
                                    onChange={handleChange}
                                  />
                                  {
                                    errors.description && (
                                      <p className="text-danger">{errors.description}</p>
                                    )
                                  }
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        </fieldset>
                        {
                          errors.misc && (
                            <p className="text-dange">{errors.misc}</p>
                          )
                        }
                        <button className="mt-1 punchred-button" onClick={(e) => {
                          e.preventDefault()
                          setShowPopup(true)
                        }}>
                          Update
                        </button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <ConfirmUpdatePopup show={showPopup} handleSuccess={handleEditPost} handleCancel={() => setShowPopup(false)}/>
    </div>
	)
}

const ConfirmUpdatePopup = ({
  show = false,
  handleSuccess,
  handleCancel,
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
				onClick={handleCancel}
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
					Are you sure you want to update the post?
				</h4>
				<div className="d-flex flex-row justify-content-evenly mt-4">
					<button onClick={handleSuccess} className="btn btn-outline-primary bg-primary text-white" style={{width: "100px", borderRadius: "100px", fontWeight: "700"}}>
						Yes
					</button>
					<button onClick={handleCancel} className="btn-outline-primary bg-white" style={{width: "100px", fontWeight: "700", borderRadius: "100px", borderWidth: "1px"}}>
						No
					</button>
				</div>
			</div>
		</div>
  ):null
}

export default EditMediaPost;