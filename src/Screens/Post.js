import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "../Components/FormContainer";
import CircularIndeterminate from "../Components/Progress";
import Headers from "../Pages/Headers";
import ImageUpload from "../Pages/ImageUpload";
import Calls from "./Calls";

toast.configure();
const Post = () => {
  const navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  localStorage.getItem("userId");
  const [desc, setDesc] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      desc: desc,
      userId: userId,

      image: image,
      _id: localStorage.getItem("userId"),
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post("/api/posts", data, headers)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setDesc("");
          setUserId("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("name", res.data.name);
          localStorage.setItem("PostId", res.data._id);

          console.log(res.data);
          toast.success("Post Sucessful");
          navigate("/dashboard");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Post Failed");
      });
  };
  return (
    <div>
      <Headers />
      <Calls />
      {loading && <CircularIndeterminate />}
      <div>
        <FormContainer>
          <Form
            onSubmit={submitHandler}
            style={{
              backgroundColor: "white",
              border: "1px solid #0096ff",
              borderRadius: "5px",
            }}
          >
            <Form.Group controlId="name">
              <Form.Label></Form.Label>
              <Form.Control
                style={{
                  border: "1px solid #0096ff",
                  borderRadius: "5px",
                  height: "30vh",
                }}
                type="text"
                placeholder="What's on your mind..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <ImageUpload />
            {/* <Form.Group controlId="image">
              <Form.Label></Form.Label>
              <Form.Control
                style={{
                  border: "1px solid #0096ff",
                  borderRadius: "5px",
                }}
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <input
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></input>
              {uploading && <CircularIndeterminate />}
            </Form.Group> */}

            <Button type="submit" variant="primary">
              Post
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default Post;
