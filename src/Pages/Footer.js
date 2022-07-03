import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { FaHouzz, Fa } from "react-icons/fa";
import { BiAddToQueue, BiChat, BiBell } from "react-icons/bi";
import LongMenu from "../Components/Ellisps";
import "./Footerer.css";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { red } from "@mui/material/colors";
import { Avatar } from "@mui/material";

const Footer = () => {
  // const posty = useParams();

  return (
    <div className="dica">
      {/* <hr /> */}

      <div className="dipa-divine">
        {/* <div style={{ width: "15%", height: "4%", cursor: "pointer" }}> */}

        <div>
          <Link to="/dashboard">
            <FaHouzz className="font-icon5" />
          </Link>
        </div>
        <div>
          <Link to="/post">
            <BiAddToQueue className="font-icon5" />
          </Link>
        </div>
        <div>
          <Link to="/users">
            <BiChat className="font-icon5" />
          </Link>
        </div>
        <div>
          <Link to="/dashboard">
            <BiBell className="font-icon5" />
          </Link>
        </div>
        <div>
          <LinkContainer to={`/users/${localStorage.getItem("userId")}`}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label={"me"}>
              <Image
                style={{
                  fontSize: "5px",
                  display: "flex",
                  textAlign: "center",
                  objectPosition: "50% 50%",
                  objectFit: "cover",
                  width: "100%",

                  alignItem: "center",
                }}
                src={localStorage.getItem("profilePicture")}
                thumbnail
              />
            </Avatar>
          </LinkContainer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
