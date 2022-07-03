import { IconButton, Input } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
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
import UploadForm from "./UploadForm";
import { BACKEND_URI } from "../config/constants";
import Checkout2 from "../Home/Checkout2";
import Videos from "./Videos";
import FileBase64 from "react-file-base64";

toast.configure();

const PostScreen = () => {
  const navigate = useNavigate();
  localStorage.getItem("userId");
  const [desc, setDesc] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const [file, setFile] = useState({
    myFile: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeFile = async (e) => {
    setFile({ ...file, myFile: base64 });
    const file = e.target.files[0];
    const base64 = await convert2base64(file);

    console.log(base64);
  };
  const convert2base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("desc", desc);

    formData.append("userId", userId);
    formData.append("image", file);
    setLoading(true);
    // const data = {
    //   desc: desc,
    //   userId: userId,
    //   image: image,
    //   videos: videos,
    //   //   image: image,
    //   //   _id: localStorage.getItem("userId"),
    // };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post("/api/posts", formData, headers)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setDesc("");
          setUserId("");
          setFile("");

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
        setLoading(false);
        toast.error("Post Failed");
      });
  };
  return (
    <div>
      <Headers />
      <Calls />
      <Videos />
      {loading && <CircularIndeterminate />}
      <div>
        <FormContainer>
          <Form
            onSubmit={submitHandler}
            encType="multipart/form-data"
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
            <Form.Group controlId="image">
              <Form.Label></Form.Label>
              <Form.Control
                style={{
                  border: "1px solid #0096ff",
                  borderRadius: "5px",
                }}
                type="file"
                onChange={(e) => onChangeFile(e)}
              ></Form.Control>
              {/* <FileBase64
                multiple={false}
                onDone={({ base64 }) => setFile({ file: base64 })}
              />  */}
            </Form.Group>
            <Button type="submit" variant="primary">
              Post
            </Button>
            {/* {onChangeFile} */}
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default PostScreen;

{
  /* <Form.Group controlId="image">
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
<label htmlFor="icon-button-file">
  <Input
    accept="image/*"
    id="icon-button-file"
    type="file"
    multiple
    onChange={handleInputChange}
  />
  <IconButton
    color="primary"
    aria-label="upload picture"
    component="span"
  >
    <PhotoCamera />
  </IconButton>
</label>
<button onClick={submit}>Save</button>
</Form.Group> */
}
{
  /* <input
  type="file"
  name="upload-file"
  onChange={handleInputChange}
/> */
}

{
  /* {uploading && <CircularIndeterminate />} */
}
