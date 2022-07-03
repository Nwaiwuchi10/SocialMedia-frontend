// import React, { useState } from "react";

// const baseScreen = () => {
//   const [image, setImage] = useState("");

//   const convert2base64 = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setImage(reader.result.toString());
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <input
//         id="fileupload"
//         className="hidden"
//         type="file"
//         onChange={(e) => convert2base64(e)}
//       />
//       <label htmlFor="fileupload">upload file</label>
//     </div>
//   );
// };

// export default baseScreen;
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import CircularIndeterminate from "../Components/Progress";
import Headers from "../Pages/Headers";
import Calls from "./Calls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

toast.configure();
const BaseScreen = () => {
  const navigate = useNavigate();

  const [desc, setDesc] = useState("");
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadimage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convert2base64(file);
    setImage(base64);
    // setImage({ ...image, image: base64 });
    console.log(base64);
    // const reader = new FileReader();
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

    // const formData = new FormData();
    // formData.append("desc", desc);

    // formData.append("userId", userId);
    // formData.append("image", image);
    setLoading(true);
    const data = {
      desc: desc,
      user: user,
      image: image,

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
        setLoading(false);
        if (res.data) {
          setDesc("");
          setUser("");
          setImage("");

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
            <div>
              <input
                type="file"
                // multiple
                name="image"
                accept=".jpeg, .png, .jpg, "
                onChange={(e) => uploadimage(e)}
              />
            </div>
            <Button type="submit" variant="primary">
              Post
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default BaseScreen;
