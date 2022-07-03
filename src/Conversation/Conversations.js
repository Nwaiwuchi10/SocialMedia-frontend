import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import "./Chaty.css";

const Conversations = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = data.members.find((id) => id !== currentUserId);
    console.log(user);

    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${user}`);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <li className="clearfix">
      <div>
        {online && <div className="online-dot"></div>}

        <img
          src={userData?.profilePicture}
          alt="hh"
          className="followerImage"
          fluid
          thumbnail
          style={{ width: "50px", height: "50px" }}
        />
        <div className="about">
          <div className="name">
            {userData?.username}
            {userData?.Verified ? (
              <MdVerified style={{ color: "#0096ff" }} />
            ) : (
              <span></span>
            )}
          </div>
          <div className="status">
            {" "}
            {online ? "Online" : "Offline"}
            {/* <i className="fa fa-circle offline"></i> left 7 mins ago{" "} */}
          </div>
        </div>

        {/* <div style={{ color: online ? "#51e200" : "" }}>
            {online ? "Online" : "Offline"}
          </div> */}
      </div>
    </li>
  );
};

export default Conversations;
