import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Demo slider
import React, { Component } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Slider from "react-slick";
import "./UICards.css";

export default class SimpleSlider extends Component {
  render() {
    console.log("props", this.props);
    const settings = {
      dots: true,
      // infinite: true,
      // speed: 500,
      // slidesToShow: 1,
      // slidesToScroll: 1,
    };

    return (
      <div>
        {/* <Slider {...settings}>
          <Image src={this.props.posty} className="gy" />
        </Slider> */}
      </div>
    );
  }
}
