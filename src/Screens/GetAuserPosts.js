import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import Headers from "../Pages/Headers";

const GetAuserPosts = () => {
  //   const { id } = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`/api/posts/profile/${localStorage.getItem("userId")}`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data) {
          setPost(response.data);
          console.log(response.data);

          localStorage.setItem(
            "UserPostDetails",
            JSON.stringify(response.data._id)
          );
        }
      });
  }, []);
  return (
    <div>
      {/* {post.map((pet) => (
        <div>
          {pet.img.map((video) => {
            return ( */}
      {post.map((pet) => (
        <div>
          <Image src={pet.image} alt="image 1" className="w-100 rounded-3" />
        </div>
      ))}
      {/* );
          })}
        </div>
      ))} */}
    </div>
  );
};

export default GetAuserPosts;
