import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { FaHouzz, FaTelegramPlane, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import LongMenu from "../Components/Ellisps";
import SearchBox from "../Components/SearchBox";
import { BiAddToQueue, BiChat, BiBell } from "react-icons/bi";
import "./Header.css";

const Headers = () => {
  return (
    <div className="tew">
      <Nav variant="pills" activeKey="1" className="div-main">
        <Nav.Item>
          <Nav.Link eventKey="2" title="Item" className="h1">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              LetsMeet{" "}
            </Link>
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link eventKey="1" href="#/home">
            LetsMeet
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item className="box-div">
          <Nav.Link eventKey="2" title="Item">
            <SearchBox className="box" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" title="Item">
            <Link to="/post">
              <BiAddToQueue className="font-icon" />
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="box-div2">
          <Nav.Link eventKey="3" disabled>
            <FaSearch className="font-icon-esp" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" disabled>
            <FaTelegramPlane className="font-icon" />
          </Nav.Link>
        </Nav.Item>
        <LongMenu />
      </Nav>
    </div>
  );
};

export default Headers;
