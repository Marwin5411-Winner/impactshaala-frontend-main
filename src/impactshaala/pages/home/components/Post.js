import React, { useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../../../components/Card";
import CustomToggle from "../../../../components/dropdowns";
import ShareOffcanvas from "../../../../components/share-offcanvas";
import { Link } from "react-router-dom";

import user1 from "../../../../assets/images/user/01.jpg";
import user02 from "../../../../assets/images/user/02.jpg";
import user03 from "../../../../assets/images/user/03.jpg";

import icon1 from "../../../../assets/images/icon/01.png";
import icon2 from "../../../../assets/images/icon/02.png";
import icon3 from "../../../../assets/images/icon/03.png";
import icon4 from "../../../../assets/images/icon/04.png";
import icon5 from "../../../../assets/images/icon/05.png";
import icon6 from "../../../../assets/images/icon/06.png";
import icon7 from "../../../../assets/images/icon/07.png";

function PostComponent() {
  return (
    <>
      <Card>
        <Card.Body>
          <div className="post-item">
            <div className="user-post-data py-3">
              <div className="d-flex justify-content-between">
                <div className="me-3">
                  <img
                    loading="lazy"
                    className="rounded-circle avatar-60"
                    src={user1}
                    alt=""
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="mb-0 d-inline-block">
                        <Link to="#">Bni Cyst</Link>
                      </h5>
                      <p className="ms-1 mb-0 d-inline-block">
                        Update his Status
                      </p>
                      <p className="mb-0">7 hour ago</p>
                    </div>
                    <div className="card-post-toolbar">
                      <Dropdown>
                        <Dropdown.Toggle className="bg-transparent border-white">
                          <i className="ri-more-fill"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className=" m-0 p-0">
                          <Dropdown.Item className="p-3" to="#">
                            <div className="d-flex align-items-top">
                              <i className="ri-save-line h4"></i>
                              <div className="data ms-2">
                                <h6>Save Post</h6>
                                <p className="mb-0">
                                  Add this to your saved items
                                </p>
                              </div>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item className="p-3" to="#">
                            <div className="d-flex align-items-top">
                              <i className="ri-pencil-line h4"></i>
                              <div className="data ms-2">
                                <h6>Edit Post</h6>
                                <p className="mb-0">
                                  Update your post and saved items
                                </p>
                              </div>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item className="p-3" to="#">
                            <div className="d-flex align-items-top">
                              <i className="ri-close-circle-line h4"></i>
                              <div className="data ms-2">
                                <h6>Hide From Timeline</h6>
                                <p className="mb-0">
                                  See fewer posts like this.
                                </p>
                              </div>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item className="dropdown-item p-3" to="#">
                            <div className="d-flex align-items-top">
                              <i className="ri-delete-bin-7-line h4"></i>
                              <div className="data ms-2">
                                <h6>Delete</h6>
                                <p className="mb-0">
                                  Remove thids Post on Timeline
                                </p>
                              </div>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item className="p-3" to="#">
                            <div className="d-flex align-items-top">
                              <i className="ri-notification-line h4"></i>
                              <div className="data ms-2">
                                <h6>Notifications</h6>
                                <p className="mb-0">
                                  Turn on notifications for this post
                                </p>
                              </div>
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-post">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </p>
            </div>
            <div className="comment-area mt-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="like-block position-relative d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="like-data">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                          <img
                            loading="lazy"
                            src={icon1}
                            className="img-fluid"
                            alt=""
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className=" py-2">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Like</Tooltip>}
                            className="ms-2 me-2"
                          >
                            <img
                              loading="lazy"
                              src={icon1}
                              className="img-fluid me-2"
                              alt=""
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Love</Tooltip>}
                            className="me-2"
                          >
                            <img
                              loading="lazy"
                              src={icon2}
                              className="img-fluid me-2"
                              alt=""
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Happy</Tooltip>}
                            className="me-2"
                          >
                            <img
                              loading="lazy"
                              src={icon3}
                              className="img-fluid me-2"
                              alt=""
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>HaHa</Tooltip>}
                            className="me-2"
                          >
                            <img
                              loading="lazy"
                              src={icon4}
                              className="img-fluid me-2"
                              alt=""
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Think</Tooltip>}
                            className="me-2"
                          >
                            <img
                              loading="lazy"
                              src={icon5}
                              className="img-fluid me-2"
                              alt=""
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Sade</Tooltip>}
                            className="me-2"
                          >
                            <img
                              loading="lazy"
                              src={icon6}
                              className="img-fluid me-2"
                              alt=""
                            />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Lovely</Tooltip>}
                            className="me-2"
                          >
                            <img
                              loading="lazy"
                              src={icon7}
                              className="img-fluid me-2"
                              alt=""
                            />
                          </OverlayTrigger>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="total-like-block ms-2 me-3">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="post-option">
                          140 Likes
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item to="#">Max Emum</Dropdown.Item>
                          <Dropdown.Item to="#">Bill Yerds</Dropdown.Item>
                          <Dropdown.Item to="#">Hap E. Birthday</Dropdown.Item>
                          <Dropdown.Item to="#">Tara Misu</Dropdown.Item>
                          <Dropdown.Item to="#">Midge Itz</Dropdown.Item>
                          <Dropdown.Item to="#">Sal Vidge</Dropdown.Item>
                          <Dropdown.Item to="#">Other</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="total-comment-block">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} id="post-option">
                        20 Comment
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item to="#">Max Emum</Dropdown.Item>
                        <Dropdown.Item to="#">Bill Yerds</Dropdown.Item>
                        <Dropdown.Item to="#">Hap E. Birthday</Dropdown.Item>
                        <Dropdown.Item to="#">Tara Misu</Dropdown.Item>
                        <Dropdown.Item to="#">Midge Itz</Dropdown.Item>
                        <Dropdown.Item to="#">Sal Vidge</Dropdown.Item>
                        <Dropdown.Item to="#">Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <ShareOffcanvas />
              </div>
              <hr />
              <ul className="post-comments p-0 m-0">
                <li className="mb-2">
                  <div className="d-flex flex-wrap">
                    <div className="user-img">
                      <img
                        loading="lazy"
                        src={user02}
                        alt="userimg"
                        className="avatar-35 rounded-circle img-fluid"
                      />
                    </div>
                    <div className="comment-data-block ms-3">
                      <h6>Monty Carlo</h6>
                      <p className="mb-0">Lorem ipsum dolor sit amet</p>
                      <div className="d-flex flex-wrap align-items-center comment-activity">
                        <Link to="#">like</Link>
                        <Link to="#">reply</Link>
                        <Link to="#">translate</Link>
                        <span> 5 min </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-wrap">
                    <div className="user-img">
                      <img
                        loading="lazy"
                        src={user03}
                        alt="userimg"
                        className="avatar-35 rounded-circle img-fluid"
                      />
                    </div>
                    <div className="comment-data-block ms-3">
                      <h6>Paul Molive</h6>
                      <p className="mb-0">Lorem ipsum dolor sit amet</p>
                      <div className="d-flex flex-wrap align-items-center comment-activity">
                        <Link to="#">like</Link>
                        <Link to="#">reply</Link>
                        <Link to="#">translate</Link>
                        <span> 5 min </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <form className="comment-text d-flex align-items-center mt-3">
                <input
                  type="text"
                  className="form-control rounded"
                  placeholder="Enter Your Comment"
                />
                <div className="comment-attagement d-flex">
                  <Link to="#" className="material-symbols-outlined me-3 link">
                    insert_link
                  </Link>
                  <Link to="#" className="material-symbols-outlined  me-3">
                    sentiment_satisfied
                  </Link>
                  <Link to="#" className="material-symbols-outlined  me-3">
                    photo_camera
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default PostComponent;
