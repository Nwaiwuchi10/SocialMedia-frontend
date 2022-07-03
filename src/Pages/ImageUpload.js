import axios from "axios";
import React from "react";
import { useState } from "react";

const ImageUpload = () => {
  const [userInfo, setuserInfo] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
    });
  };
  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);
    axios
      .post("/api/imageupload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        /// then print response status
        console.warn(res);
      });
  };
  return (
    <div>
      <label>Select Imagea :</label>
      <input type="file" name="upload-file" onChange={handleInputChange} />
      <button onClick={submit}>Save</button>
    </div>
  );
};

export default ImageUpload;
