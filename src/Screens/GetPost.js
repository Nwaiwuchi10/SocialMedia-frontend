import axios from "axios";
import React, { useEffect, useState } from "react";

import { Col, Image } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import RecipeReviewCard from "../Components/UICards";
import "./GEtPost.css";

const GetPost = () => {
  let postDetail = JSON.parse(localStorage.getItem("All-Post"));
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/api/posts");
      console.log(data);
      setPost(data);
      setLoading(false);
      setError(false);

      // localStorage.setItem("desc", data.desc);
      // localStorage.setItem("Created", data.createdAt);
      // localStorage.setItem("userId", data.userId);
      // localStorage.setItem("PostId", data._id);
      // localStorage.setItem("likes", data.likes);
      // localStorage.setItem("favourites", data.favourites);
      // localStorage.setItem("updatedAt", data.updatedAt);
      // localStorage.setItem("image", data.img);
      localStorage.setItem("PostId", JSON.stringify(data));
      // localStorage.setItem("All-Post", JSON.stringify(data));
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Failed</Message>
      ) : (
        <Row>
          {" "}
          {post.map((posty) => (
            <Col className="div-t" key={posty._id} sm={12} md={6} lg={4} xl={3}>
              <RecipeReviewCard posty={posty} />

              {/* <Image src={`/uploads/${posty.image}`} alt="yi" /> */}
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default GetPost;
