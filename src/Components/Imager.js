//Demo slider
import React, { Component } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Imager extends Component {
  render() {
    console.log("props", this.props);

    return (
      <div>
        <Link to="/ ">
          <Image src={this.props.posty} />
        </Link>
      </div>
    );
  }
}
