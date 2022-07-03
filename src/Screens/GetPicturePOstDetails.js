import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import Headers from "../Pages/Headers";

const GetPicturePOstDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`/api/posts/${id}`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data) {
          setPost(response.data);
          console.log(response.data);

          localStorage.setItem(
            "PostDetails",
            JSON.stringify(response.data._id)
          );
        }
      });
  }, [id]);
  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <Headers />

      <Image
        src={post.image}
        class="img-fluid"
        alt="Responsive image"
        thumbnail
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          width: "90%",
          height: "80vh",
          objectFit: "cover",
        }}
      />

      {/* <video
        preload="auto"
        width="320"
        height="240"
        controls
        autoplay
        loop
        muted
        type="video/mp4"

      >
        <source src={post.video} />
      </video> */}
      {/* {post.image.map((img) => {
        return (
          <Image
            src={img}
            class="img-fluid"
            alt="Responsive image"
            thumbnail
            fluid
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              width: "90%",
              height: "80vh",
              objectFit: "cover",
            }}
          />
        );
      })}
      {post.videos.map((video) => {
        return (
          <video
            preload="auto"
            width="320"
            height="240"
            controls
            autoplay
            loop
            muted
            type="video/mp4"
          >
            <source src={video} />
          </video>
        );
      })} */}
    </div>
  );
};

export default GetPicturePOstDetails;
