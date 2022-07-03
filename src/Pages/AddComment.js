import { Button, TextField } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";
import CircularIndeterminate from "../Components/Progress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

toast.configure();
const AddComment = ({ posty }) => {
  // const Poste = localStorage.getItem("All-Post");

  // localStorage.getItem("userId");
  // localStorage.getItem("PostId");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [PostId, setPostId] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      text: text,
      userId: userId,
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
      .put(`/api/posts/comment/${posty._id}/`, data, headers)
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setText("");
          setUserId("");
          setPostId("");
          setLoading(false);

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("tex", res.data.text);

          localStorage.setItem("UserId", res.data.userId);
          localStorage.setItem("PostId", res.data._id);

          console.log(res.data);
          toast.success("Commented Sucessfully");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Post Comment Failed");
      });
  };
  return (
    <div>
      {loading && <CircularIndeterminate />}
      <Form onSubmit={submitHandler}>
        <TextField
          id="standard-basic"
          label="Comment..."
          variant="standard"
          type={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
