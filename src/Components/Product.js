import React from "react";
import { Card } from "react-bootstrap";
import SimpleSlider from "./Slider";

const Product = ({ posty }) => {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <SimpleSlider posty={posty.img} />

        <Card.Body>
          <Card.Title as="div">
            <strong>{posty.desc}</strong>
          </Card.Title>

          <Card.Text as="div"></Card.Text>
          <Card.Text as="h3"></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
