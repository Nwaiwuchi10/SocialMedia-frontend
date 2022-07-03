import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import DashBoard from "./Home/DashBoard";
import SignUp from "./Screens/SignUp";
import SignUpScreen from "./Screens/SignUpScreen";
import StudentSignup from "./Screens/StudentSignup";
import GetProfile from "./Pages/GetProfile";
import Post from "./Screens/Post";
import Message from "./Socketio/Message";
import GetUsersScreen from "./Screens/GetUsersScreen";
import EdithProfileScreen from "./Screens/EdithProfileScreen";
import EditProfile from "./Screens/EditProfile";

import PostScreen from "./Screens/PostScreen";

import UploadForm from "./Screens/UploadForm";
import Slider2 from "./Components/Slider2";
import GetPicturePOstDetails from "./Screens/GetPicturePOstDetails";
import GetAllComments from "./Pages/GetAllComments";
import GetAllLikes from "./Pages/GetAllLikes";
import BaseScreen from "./Screens/BaseScreen";
import GetallUsersTimeline from "./TimeLine/GetallUsersTimeline";
import Coversation from "./Chats/Coversation";
import Chaty from "./Chats/Chaty";
import ChatBox from "./Chats/ChatBox";

function App({ posty }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/users/:id" element={<GetProfile />} />
        <Route path="/post" element={<BaseScreen />} />
        <Route path="/Conversation" element={<GetUsersScreen />} />
        <Route path="/getcomments" element={<GetAllComments />} />
        <Route path="/getlikes" element={<GetAllLikes posty={posty} />} />
        {/* <Route path="/users" element={<Chaty />} /> */}
        {/* <Route path="/letschart" element={<ChatBox />} /> */}
        <Route path="/users" element={<Coversation />} />
        {/* <Route path="/users" element={<Conv />} /> */}
        <Route path="/postvideos" element={<UploadForm />} />
        <Route path="/posts/:id" element={<GetPicturePOstDetails />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/status" element={<GetallUsersTimeline />} />
      </Routes>
    </div>
  );
}

export default App;
