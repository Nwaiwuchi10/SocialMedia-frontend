import React from "react";
import { Container } from "react-bootstrap";
import RecipeReviewCard from "../Components/MuiCard";
import Slider2 from "../Components/Slider2";
import SimpleSlider from "../Components/Slider2";
import CommentModal from "../modal/CommentModal";
import Footer from "../Pages/Footer";
import Footers from "../Pages/Footers";
import Headers from "../Pages/Headers";
import GetPost from "../Screens/GetPost";
import UploadList from "../Screens/UploadList";
import VideoApp from "../Screens/Video";

import CheckoutCompo from "./CheckoutCompo";

const DashBoard = () => {
  return (
    <div>
      <Headers />
      <hr />
      <CheckoutCompo />
      <Container>
        <GetPost />
      </Container>
      <Footer />
    </div>
  );
};

export default DashBoard;
