import React, { startTransition, useEffect, useState } from "react";
import Headers from "../Pages/Headers";
import Calls from "../Screens/Calls";
import Slide from "react-reveal/Slide";
import { Col, Row } from "react-bootstrap";
import LongMenu from "../Components/Ellisps";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import Loader from "../Components/Loader";
import axios from "axios";
import { BsJournalArrowDown } from "react-icons/bs";
import MyStatus from "./MyStatus";
import "./GetTime.css";

const GetallUsersTimeline = () => {
  const [status, setSatus] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get("/api/status/", {
        headers: headers,
      })
      .then((response) => {
        if (response.data) {
          setSatus(response.data);
          setLoading(false);
          console.log(response.data);

          localStorage.setItem(
            "statusDetails",
            JSON.stringify(response.data.status)
          );
        }
      });
  }, []);
  return (
    <div>
      <Headers />
      <Calls />
      <hr />
      {loading && <Loader />}
      <div className="container">
        <MyStatus />

        <div style={{ fontSize: "12.5px" }}>
          Recent TimeLines{" "}
          <span>
            <BsJournalArrowDown />
          </span>
        </div>

        <Row>
          {status.map((stat) => (
            <Col className="div-t" sm={12} md={6} lg={4} xl={3}>
              <Slide left>
                <CardHeader
                  avatar={
                    <div>
                      <Avatar
                        className="tog-div"
                        sx={{ bgcolor: blue[500] }}
                        aria-label={"hi"}
                      >
                        <div
                          style={{
                            fontSize: "8px",
                            display: "flex",
                            textAlign: "center",
                            alignItem: "center",
                            color: "whiteSmoke",
                          }}
                        >
                          {stat.desc}
                        </div>
                      </Avatar>{" "}
                    </div>
                  }
                  action={<IconButton aria-label="settings"></IconButton>}
                  title={
                    <strong style={{ color: "grey" }}>
                      {stat.user.username}
                    </strong>
                  }
                  subheader={stat.user.createdAt}
                />
              </Slide>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default GetallUsersTimeline;
