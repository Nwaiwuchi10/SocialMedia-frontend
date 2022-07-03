import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { singleFileUpload } from "../data/api";

import axios from "axios";

import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "../Components/FormContainer";

import Headers from "../Pages/Headers";

import Calls from "./Calls";
import { FaUserFriends } from "react-icons/fa";

toast.configure();

const PostS = (props) => {
  const navigate = useNavigate();
  localStorage.getItem("userId");
  const [desc, setDesc] = useState("");
  const [singleFile, setSingleFile] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);
    await singleFileUpload(formData);
    props.getsingle();
    // console.log(singleFile);
  };
  const uploadMultipleFiles = async () => {
    console.log(multipleFiles);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // setLoading(true);
    const data = {
      desc: desc,
      userId: userId,
      singleFile: singleFile,
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
      .post("/api/posts", data, headers)
      .then((res) => {
        console.log(res.data);
        // setLoading(false);
        if (res.data) {
          setDesc("");
          setUserId("");
          setSingleFile("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("desc", res.data.desc);
          localStorage.setItem("Created", res.data.createdAt);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("PostId", res.data._id);

          console.log(res.data);
          toast.success("Post Sucessful");
          navigate("/dashboard");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        // setLoading(false);
        toast.error("Post Failed");
      });
  };
  return (
    <div className="container">
      <Headers />
      <Calls />
      {/* {loading && <CircularIndeterminate />} */}
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
            <div>
              {" "}
              <label>Single Upload</label>
              <Form.Control
                style={{
                  border: "1px solid #0096ff",
                  borderRadius: "5px",
                }}
                type="text"
                placeholder="Enter image url"
                value={singleFile}
                onChange={(e) => setSingleFile(e.target.value)}
              ></Form.Control>
              <input
                type="file"
                className="form-control"
                onChange={(e) => SingleFileChange(e)}
              />
              <button onClick={() => uploadSingleFile()}>Upload</button>
            </div>
            {/* <div>
              {" "}
              <label>Multiple Upload</label>
              <input
                type="text"
                placeholder="title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="file"
                className="form-control"
                multiple
                onChange={(e) => MultipleFileChange(e)}
              />
              <button onClick={() => uploadMultipleFiles()}>Upload</button>
            </div> */}
            <Button type="submit" variant="primary">
              Post
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default PostS;
