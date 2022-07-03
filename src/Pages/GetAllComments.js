import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import Loader from "../Components/Loader";
import { Col } from "react-bootstrap";
import axios from "axios";
import "./GetAllComments.css";
import AddComment from "./AddComment";

const GetAllComments = ({ posty }) => {
  return (
    <div className="container justify-content-center mt-5 border-left border-right">
      <div className="d-flex justify-content-center pt-3 pb-2">
        {" "}
        <AddComment />
      </div>
      <div className="d-flex justify-content-center py-2">
        <div className="second py-2 px-2">
          {" "}
          {posty.comments.map((comments) => {
            return (
              <div className="d-flex justify-content-between py-1 pt-2">
                <div>
                  <div>
                    <img
                      src="https://i.imgur.com/AgAC1Is.jpg"
                      width="18"
                      alt="tye"
                    />
                    <span className="text2">{comments?.user?.username} </span>{" "}
                    <span style={{ fontSize: "15px" }}>{comments.text}</span>
                  </div>
                  <div>
                    <span className="text3">Reply</span>
                    <span class="thumbup">
                      <i className="fa fa-thumbs-o-up"></i>
                    </span>
                    <span className="text4">3</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {/* {" "}
      {posty.comments.map((comments) => {
        return <span style={{ fontSize: "10px" }}>{comments.text}</span>;
      })}{" "} */}
        </div>
      </div>
    </div>
  );
};

export default GetAllComments;
