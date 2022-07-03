import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { Button } from "react-bootstrap";
import "./ChatBox.css";
import "./Chaty.css";
import { MdVerified } from "react-icons/md";

const ChatBox = ({
  conversation,
  currentUser,
  setSendMessage,
  receiveMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();

  // Receive Message from parent component
  useEffect(() => {
    if (
      receiveMessage !== null &&
      receiveMessage.conversationId === conversation._id
    ) {
      setMessages([...messages, receiveMessage]);
      console.log("Message Arrived: ", receiveMessage);
    }
  }, [receiveMessage]);

  ///fetching data from header

  useEffect(() => {
    const user = conversation?.members?.find((id) => id !== currentUser);
    console.log(user);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${user}`);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (conversation !== null) getUserData();
  }, [conversation, currentUser]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`/api/messages/${conversation._id}`);
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (conversation !== null) getMessages();
  }, [conversation]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  const handleSend = async (e) => {
    e.preventDefault();
    const data = {
      senderId: currentUser,
      text: newMessage,
      conversationId: conversation._id,
    };
    ///send message to database

    try {
      const headers = {
        "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
        "Content-Type": "application/json",
        // Accept: "application/json",
        // body: JSON.stringify(data),
      };

      axios.post("/api/messages", data, headers);
      setMessages([...messages, data]);
      setNewMessage("");
      // .then((res) => {
      //   console.log(res.data);
      //   setLoading(false);
      //   if (res.data) {
      //     setEmail("");

      //     setPassword("");
      //   }
    } catch (error) {
      console.log(error);
    }

    ////// send message to socket server
    const receiverId = conversation.members.find((id) => id !== currentUser);
    setSendMessage([...messages, receiverId]);
  };

  ///always scroll to the last massage
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chat-header clearfix">
        {conversation ? (
          <>
            <div className="chat-header clearfix">
              <div className="row">
                <div className="col-lg-6">
                  <a
                    href="javascript:void(0);"
                    data-toggle="modal"
                    data-target="#view_info"
                  >
                    <img
                      src={userData?.profilePicture}
                      alt="hh"
                      className="followerImage"
                      fluid
                      thumbnail
                      style={{ width: "50px", height: "50px" }}
                    />
                  </a>

                  <div className="chat-about">
                    <h6 className="m-b-0">
                      {" "}
                      <span>
                        {userData?.username}{" "}
                        {userData?.Verified ? (
                          <MdVerified style={{ color: "#0096ff" }} />
                        ) : (
                          <span></span>
                        )}{" "}
                      </span>
                    </h6>
                    <small> {format(userData?.createdAt)}</small>
                  </div>
                </div>
                <div className="col-lg-6 hidden-sm text-right">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-secondary"
                  >
                    <i className="fa fa-camera"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-primary"
                  >
                    <i className="fa fa-image"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-info"
                  >
                    <i className="fa fa-cogs"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-outline-warning"
                  >
                    <i className="fa fa-question"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* checkbox message */}

            <div className="chat-history">
              <ul className="m-b-0">
                <li className="clearfix">
                  <div className="chat-body">
                    {messages.map((message) => (
                      <>
                        <div
                          ref={scroll}
                          className={
                            message.sender === currentUser
                              ? "message own"
                              : "message"
                          }
                        >
                          <li class="clearfix">
                            <div className="message-data">
                              <span className="message-data-time">
                                {format(message.createdAt)}
                              </span>
                            </div>
                            <div className="message my-message">
                              {message.text}
                            </div>
                          </li>
                        </div>
                      </>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            {/* chh */}
            <div className="chat-message clearfix">
              <div className="input-group mb-0">
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                  placeholder="Enter text here..."
                />
              </div>
              <span>
                <Button className="send-btn-me" onClick={handleSend}>
                  Send
                </Button>
              </span>{" "}
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
