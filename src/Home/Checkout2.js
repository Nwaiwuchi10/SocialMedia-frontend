import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Checkout2 = ({ step1, step2 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/post">
            <Nav.Link>Photos</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Photos</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/postvideos">
            <Nav.Link>Videos</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Videos</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default Checkout2;
