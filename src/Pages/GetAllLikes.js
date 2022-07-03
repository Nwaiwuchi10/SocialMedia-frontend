import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import Loader from "../Components/Loader";
import { Col } from "react-bootstrap";
import axios from "axios";

const GetAllLikes = () => {
  const [posty, setPosty] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("/api/posts/", {
        headers: headers,
      })
      .then((response) => {
        if (response.data) {
          setPosty(response.data);
          setLoading(false);
          console.log(response.data);

          localStorage.setItem(
            "LikesDetails",
            JSON.stringify(response.data._id)
          );
        }
      });
  }, []);

  return (
    <div>
      <Headers />
      {loading && <Loader />}
      still working on the page
    </div>
  );
};

export default GetAllLikes;
