import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  Form,
} from "react-bootstrap";
import { Image } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { useRef, useState } from "react";

function Test() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleProfileClick = () => {
    console.log("clicked");
    // Trigger the hidden file input when the profile div is clicked
    fileInputRef.current.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };


  return (
    <>
      <div className="container mt-5">
        <Card>
          <CardBody>
            <CardTitle tag="h5">Profile Picture</CardTitle>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "150px",
                  height: "150px",
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                className="upload-placeholder mb-4"
                onClick={handleImageClick}
              >
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Uploaded Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <p
                    style={{ padding: "20px", fontSize: "16px", margin: 0 }}
                    className="mt-4"
                  >
                    Click to upload Image
                  </p>
                )}
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Test;
