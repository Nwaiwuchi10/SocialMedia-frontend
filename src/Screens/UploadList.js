import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BACKEND_URI } from "../config/constants";
import ReactPlayer from "react-player";
import RecipeReviewCard from "../Components/MuiCard";

const UploadList = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/vl/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened");
      });
  };
  return (
    <div>
      UploadList
      <Row className="container">
        {" "}
        {medias.map((pet) => (
          <Col>
            {/* <RecipeReviewCard pet={pet} /> */}
            {/* <Col>{pet.name}</Col> */}
            {/* <Col>
              {pet.videos.map((video) => {
                return (
                  // <ReactPlayer
                  //   url={`${BACKEND_URI}${video}`}
                  //   width="320"
                  //   height="240"
                  //   controls
                  // />
                  <video
                    preload="auto"
                    width="320"
                    height="240"
                    controls
                    autoplay
                    loop
                    muted
                  >
                    <source src={`${BACKEND_URI}${video}`} />
                  </video>
                );
              })}{" "}
            </Col> */}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UploadList;
