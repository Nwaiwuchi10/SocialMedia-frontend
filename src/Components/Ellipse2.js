import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import FollowAuser from "../Pages/FollowAuser";

const options = [
  <Link style={{ textDecoration: "none", color: "grey" }} to="/updatepost">
    Update Post
  </Link>,
  <Link style={{ textDecoration: "none", color: "grey" }} to="/delete">
    Delete
  </Link>,
  <Link style={{ textDecoration: "none", color: "grey" }} to="/link">
    Link
  </Link>,

  <Link style={{ textDecoration: "none", color: "grey" }} to="/follow">
    Follow
  </Link>,
  <Link style={{ textDecoration: "none", color: "grey" }} to="/unfollow">
    UnFollow
  </Link>,
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ posty }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
            posty={posty}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
