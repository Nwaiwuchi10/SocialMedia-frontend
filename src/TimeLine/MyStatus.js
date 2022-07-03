import { Avatar, CardHeader, IconButton } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import LongMenu from "../Components/Ellipse2";

const MyStatus = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: blue[500] }}
            aria-label={<BsFillPersonPlusFill />}
          >
            {" "}
            <BsFillPersonPlusFill />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <LongMenu />{" "}
          </IconButton>
        }
        title={<strong style={{ color: "grey" }}>My Stories</strong>}
        //   subheader={""}
      />
    </div>
  );
};

export default MyStatus;
