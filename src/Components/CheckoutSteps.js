import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/dashboard">
            <Nav.Link>HOME</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>HOME</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/users">
            <Nav.Link>CHATS</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>CHATS</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/status">
            <Nav.Link>STATUS</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>STATUS</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/call">
            <Nav.Link>CALLS</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>CALLS</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
