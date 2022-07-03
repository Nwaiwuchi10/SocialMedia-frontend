import axios from "axios";
import React, { useState } from "react";
import { GrLike } from "react-icons/gr";

import "./Favourite.css";

const LikePost = ({ posty }) => {
  // localStorage.getItem("userId");
  // localStorage.getItem("PostId");
  const [likes, setLikes] = useState(posty.likes.length);

  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [PostId, setPostId] = useState("");
  const [style, setStyle] = useState("cont3");

  const likePost = (e) => {
    e.preventDefault();
    setStyle("cont2");
    setLikes(isLiked ? likes - 1 : likes + 1);
    alert("you Like as been added");
    setIsLiked(!isLiked);

    const data = {
      likes: likes,
      user: user,
      PostId: PostId,
      //   image: image,
      //   _id: localStorage.getItem("userId"),
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(`/api/posts/like/${posty._id}`, data, headers)
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setLikes("");
          setUser("");
          setPostId("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("name", res.data.name);
          localStorage.setItem("PostId", res.data._id);

          console.log(res.data);
        } else {
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <div>
        <GrLike className={style} onClick={likePost} />
      </div>
    </div>
  );
};

export default LikePost;
