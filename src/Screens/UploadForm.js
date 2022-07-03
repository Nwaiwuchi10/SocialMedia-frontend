import axios from "axios";
import React, { useState } from "react";
import FormContainer from "../Components/FormContainer";
import { BACKEND_URI } from "../config/constants";
import Headers from "../Pages/Headers";
import Calls from "./Calls";
import Videos from "./Videos";
// import { BACKEND_URI } from "../config/constants";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }
    formdata.append("name", name);
    axios
      .post(`${BACKEND_URI}/api/vl/media/create`, formdata)
      .then((success) => {
        // getAllMedias();

        alert("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };
  return (
    <div>
      <Headers />
      <Calls />
      <Videos />
      <div>
        <FormContainer>
          <form
            style={{
              backgroundColor: "white",
              border: "1px solid #0096ff",
              borderRadius: "5px",
            }}
            onSubmit={handleSubmit}
          >
            <label></label>
            <input
              style={{
                border: "1px solid #0096ff",
                borderRadius: "5px",
                height: "30vh",
              }}
              placeholder="What's on your mind..."
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label></label>
            <input
              style={{
                border: "1px solid #0096ff",
                borderRadius: "5px",
              }}
              type="file"
              name="videos"
              id="videos"
              multiple
              accept=".mp4, .mkv"
              onChange={(e) => setVideos(e.target.files)}
            />
            <button>submit</button>
          </form>
        </FormContainer>
      </div>
    </div>
  );
};

export default UploadForm;
