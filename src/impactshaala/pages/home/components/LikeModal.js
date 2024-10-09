import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import user01 from "../../../../assets/images/user/1.jpg";

function LikeModal({
  likes = []
}) {

    console.log(likes)
    const [modalShow, setModalShow] = useState(false);
    
    function handleModelClose() {
      setModalShow(false);
    }
  
    return (
      <>
        <span
          className=" text-primary"
          onClick={() => setModalShow(true)}
          style={{ cursor: "pointer" }}
        >
          {likes.length} Likes
        </span>
  
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShow}
          onHide={() => handleModelClose()}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Likes</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}
          >
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            <LikeElement />
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={() => handleModelClose()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
function LikeElement() {
    return (
      <Card>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src={user01} className="img-fluid rounded-circle" alt="" />
              <h6 className="mb-0 ms-3">Anna Sthesia</h6>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

export default LikeModal;
  