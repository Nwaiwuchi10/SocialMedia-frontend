import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Conversation from "../Conversation/Conversation";
import Conversations from "../Conversation/Conversations";
import Headers from "../Pages/Headers";
import Calls from "../Screens/Calls";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
import "./Chaty.css";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

// import "./Conversation.css";

const Coversation = () => {
  const user = localStorage.getItem("userId");
  console.log(user);

  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`api/conversations/${localStorage.getItem("userId")}`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data) {
          setConversation(response.data);
          console.log(response.data);
          localStorage.setItem(
            "conversationId",
            JSON.stringify(response.data._id)
          );
        }
      });
  }, [user]);

  ///connecting to io
  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.emit("new-user-add", localStorage.getItem("userId"));
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [user]);
  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  // receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (conversation) => {
    const conversationMember = conversation.members.find(
      (member) => member !== localStorage.getItem("userId")
    );
    const online = onlineUsers.find(
      (user) => user.userId === conversationMember
    );
    return online ? true : false;
  };

  return (
    <div>
      <Headers />
      <Calls />
      <hr />
      {/* <div className="Chat"> */}
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
                <hr />
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    {" "}
                    <Link to="/Conversation">
                      <BsFillBookmarkPlusFill
                        style={{ fontSize: "70px", color: "#434651" }}
                      />
                    </Link>
                    <span style={{ fontSize: "15px" }}>
                      Add a User to start conversation
                    </span>
                  </div>{" "}
                  {conversation.map((conversation) => (
                    <div onClick={() => setCurrentChat(conversation)}>
                      <Conversations
                        data={conversation}
                        currentUserId={localStorage.getItem("userId")}
                        online={checkOnlineStatus(conversation)}
                      />
                    </div>
                  ))}
                </ul>
              </div>
              {/* jj */}

              <div className="chat">
                {/* chat history */}
                <ChatBox
                  conversation={currentChat}
                  currentUserId={localStorage.getItem("userId")}
                  setSendMessage={setSendMessage}
                  receiveMessage={receiveMessage}
                />
              </div>
              {/* jj */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coversation;
