import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FollowAuser = ({ posty }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState(posty.followers.includes(posty?.user?._id));
  const followuser = (e) => {
    e.preventDefault();

    const data = {
      userId: userId,
      user: user,

      //   image: image,
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(`/api/users/${localStorage.getItem("userId")}/follow`, data, headers)
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setUserId("");
          setUser("");
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
      <Form onSubmit={followuser}>
        <Button type="submit">Follow</Button>
      </Form>
    </div>
  );
};

export default FollowAuser;
