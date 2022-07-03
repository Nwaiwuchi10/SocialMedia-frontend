import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import RecipeReviewCard from "../Components/UICards";
import Headers from "../Pages/Headers";
import Calls from "./Calls";
import { MdOutlineVerified, MdVerified } from "react-icons/md";
import "./GetUsers.css";

const GetUsersScreen = () => {
  let postDetail = JSON.parse(localStorage.getItem("All-Post"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/api/users");

      setUsers(data);
      setLoading(false);
      setError(false);
      localStorage.setItem("All-Users", JSON.stringify(data));
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Headers />
      <Calls />
      <hr />
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">Failed</Message>
        ) : (
          <Row>
            {" "}
            {users.map((usy) => (
              <Col
                className="div-re"
                key={usy._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <div className="figo-div">
                  {" "}
                  <Image
                    className="boy"
                    src={usy.profilePicture}
                    fluid
                    thumbnail
                  />{" "}
                  {/* <MdOutlineVerified src={usy.Verified} /> */}
                  <Link
                    to="/users"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    {usy.username}
                  </Link>
                  <span className="boy2">
                    {usy.Verified ? (
                      <MdVerified style={{ color: "#0096ff" }} />
                    ) : (
                      <span></span>
                    )}
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </FormContainer>
    </div>
  );
};

export default GetUsersScreen;
