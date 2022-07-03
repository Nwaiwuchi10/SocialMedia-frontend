import axios from "axios";
import React, { useState } from "react";
import { GrLike } from "react-icons/gr";

import "./Favourite.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";

const FavouritePost = ({ posty }) => {
  // localStorage.getItem("userId");
  // localStorage.getItem("PostId");
  const [favourites, setFavourites] = useState([posty.likes.length]);

  const [isFavourited, setIsFavourited] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [PostId, setPostId] = useState("");
  const [style, setStyle] = useState("cont");

  const favouritePost = (e) => {
    e.preventDefault();
    setFavourites(isFavourited ? favourites - 1 : favourites + 1);
    setIsFavourited(!isFavourited);
    alert("This post has been favourited by you");
    setStyle("cont2");
    const data = {
      favourites: favourites,
      user: user,
      PostId: PostId,
      //   image: image,
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(`/api/posts/${posty._id}/favourite`, data, headers)
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setFavourites("");
          setUser("");
          setPostId("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("PostId", res.data._id);

          console.log(res.data);
        } else {
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <div>
        <FavoriteIcon className={style} onClick={favouritePost} />
      </div>
    </div>
  );
};

export default FavouritePost;
