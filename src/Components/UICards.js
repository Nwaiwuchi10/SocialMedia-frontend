import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Carousel, Image, Modal } from "react-bootstrap";
import SimpleSlider from "./Slider";
import Product from "./Product";
import { GrLike } from "react-icons/gr";
import "./UICards.css";
import { format } from "timeago.js";
import "./Curasel.css";
import LongMenu from "../Components/Ellipse2";
import Ellipse2 from "./Ellipse2";
import LikePost from "../Pages/LikePost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import FavouritePost from "../Pages/FavouritePost";
import AddComment from "../Pages/AddComment";
import MuiImageSlider from "mui-image-slider";
import Slider from "react-slick";
import { MdVerified } from "react-icons/md";
import GetAllComments from "../Pages/GetAllComments";
import BasicModal from "../modal/CommentModal";
import CommentModal from "../modal/CommentModal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ posty }) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const settings = {
    dots: true,

    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
  };
  const Verified = localStorage.getItem("Verified");
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card sx={{ maxWidth: 545 }} className="tut">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label={posty?.user?.profilePicture}
          >
            <Image
              style={{
                fontSize: "8px",
                display: "flex",
                textAlign: "center",
                objectPosition: "50% 50%",
                objectFit: "cover",
                width: "100%",

                alignItem: "center",
              }}
              src={posty?.user?.profilePicture}
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <LongMenu />
          </IconButton>
        }
        title={
          <Link
            style={{ textDecoration: "none", color: "gray" }}
            to={`/users/${posty?.user?._id}`}
          >
            {posty?.user?.username}{" "}
            <span>
              {posty.user.Verified ? (
                <MdVerified style={{ color: "#0096ff" }} />
              ) : (
                <span></span>
              )}
            </span>
            {/* <span>
              {" "}
              <MdVerified
                style={{ color: "#0096ff" }}
                src={posty?.user?.Verified === "true"}
              />
            </span> */}
          </Link>
        }
        subheader={format(posty.createdAt)}
      />

      {/* <CardMedia
        component="img"
        height="194"
        image={posty.img}
        alt="Paella dish"
      /> */}
      <Link to={`/posts/${posty._id}`}>
        {/* <SimpleSlider
          component="img"
          height="194"
          alt="Paella dish"
          posty={posty}
        /> */}

        <Slider {...settings}>
          {posty.image.map((img) => {
            return <Image src={img} className="gy" />;
          })}

          {posty.videos.map((video) => {
            return (
              <video
                preload="auto"
                width="320"
                height="240"
                controls
                autoplay
                loop
                muted
                type="video/mp4"
              >
                <source src={video} />
              </video>
            );
          })}
        </Slider>
      </Link>
      <CardContent>
        <br />
        <Typography variant="body2" color="text.secondary">
          <span>
            <strong>{posty?.user?.username}:</strong>
          </span>
          <span>{posty.desc}</span>
        </Typography>
        <Typography variant="body3" color="text.secondary"></Typography>
        {/* <Link style={{ textDecoration: "none" }} to="/getcomments"> */}{" "}
        <Typography variant="body3" color="text.secondary">
          <div type="button" onClick={handleShow}>
            {" "}
            <strong style={{ fontSize: "10px" }}>
              View all {posty.comments.length}
              comments
            </strong>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GetAllComments posty={posty} />{" "}
              {/* {posty.comments.map((comments) => {
                return (
                  <span style={{ fontSize: "10px" }}> {comments.text}</span>
                );
              })} */}
            </Modal.Body>
          </Modal>
        </Typography>
        {/* </Link> */}
        <Link style={{ textDecoration: "none" }} to="/getlikes">
          <Typography variant="body3" color="text.secondary">
            <div>
              {" "}
              <strong style={{ fontSize: "10px" }}>
                {" "}
                {posty.likes.length} Likes
              </strong>
              {/* {posty.likes.map((like) => {
                return (
                  <strong style={{ fontSize: "10px" }}>
                    {like.length} Likes
                  </strong>
                );
              })} */}
            </div>
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/getfavourites">
          <Typography variant="body3" color="text.secondary">
            <div>
              {" "}
              <strong style={{ fontSize: "10px" }}>
                {" "}
                {posty.favourites.length} Favorites
              </strong>
              {/* {posty.favourites.map((favourite) => {
                return (
                  <strong style={{ fontSize: "10px" }}>
                    {favourite.length} Favorites
                  </strong>
                );
              })} */}
            </div>
          </Typography>
        </Link>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to grlike">
          <LikePost posty={posty} />
          {/* <GrLike /> */}
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavouritePost posty={posty} />
          {/* <FavoriteIcon /> */}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
          {/* <SharePage /> */}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <strong style={{ fontSize: "10px" }}>..Add a Comment</strong>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <strong>Comment on the post:</strong>
          </Typography>
          <Typography paragraph>
            <AddComment posty={posty} />
          </Typography>
          {/* <Typography paragraph>
            {posty.comments.map((comments) => {
              return (
                <span style={{ fontSize: "10px" }}>
                  {" "}
                  <GetAllComments
                    posty={posty}
                    class="alert alert-primary"
                    role="alert"
                  />
                </span>
              );
            })}
          </Typography> */}
          {/* <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
