import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../Pages/Headers";
import Calls from "./Calls";
import "./Editprofile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import CircularIndeterminate from "../Components/Progress";

toast.configure();

const EdithProfileScreen = () => {
  const navigate = useNavigate();
  // const id = localStorage.getItem("id");
  const { id } = useParams;
  const [username, setUserName] = useState("");
  const [city, setCity] = useState("");

  const [image, setImage] = useState("");
  const [country, setCountry] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      _id: localStorage.getItem(" userId"),
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .put(`/api/users/profiler/${id}`, data, headers)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setEmail("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("name", res.data.name);
          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("phoneNumber", res.data.phone);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("profilePicture", res.data.profilePicture);
          localStorage.setItem("coverPicture", res.data.coverPicture);
          localStorage.setItem("Verified", res.data.Verified);

          console.log(res.data);
          toast.success("Login successful");
          navigate("/dashboard");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("User Profile Update Failed");
      });
  };

  return (
    <div>
      <Headers />
      <Calls />
      <div className="container-xl px-4 mt-4">
        {/* <!-- Account page navigation--> */}
        <nav className="nav nav-borders">
          <a className="nav-link active ms-0" href="" target="__blank">
            Profile
          </a>
          <a className="nav-link" href="" target="__blank">
            Billing
          </a>
          <a className="nav-link" href="" target="__blank">
            Security
          </a>
          <a className="nav-link" href="" target="__blank">
            Notifications
          </a>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            {/* <!-- Profile picture card--> */}
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {/* <!-- Profile picture image--> */}
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
                {/* <!-- Profile picture help block--> */}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                {/* <!-- Profile picture upload button--> */}
                <button className="btn btn-primary" type="button">
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            {/* <!-- Account details card--> */}
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                {loading && <CircularIndeterminate />}
                <form onClick={submitHandler}>
                  {/* <!-- Form Group (username)--> */}
                  <div class="mb-3">
                    <label className="small mb-1" for="inputUsername">
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  {/* <!-- Form Row--> */}
                  <div className="row gx-3 mb-3">
                    {/* <!-- Form Group (first name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputFirstName">
                        About Yourself
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Decribe More About Yourself"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                    {/* <!-- Form Group (last name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        City
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <!-- Form Row        --> */}
                  <div className="row gx-3 mb-3">
                    {/* <!-- Form Group (organization name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputOrgName">
                        Country
                      </label>
                      <input
                        className="form-control"
                        id="inputOrgName"
                        type="text"
                        placeholder="Enter your Country's Name"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                    {/* <!-- Form Group (location)--> */}
                  </div>
                  {/* <!-- Form Group (email address)--> */}
                  <div class="mb-3">
                    <label className="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <!-- Form Row--> */}
                  <div className="row gx-3 mb-3">
                    {/* <!-- Form Group (phone number)--> */}
                    <div class="col-md-6">
                      <label className="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <!-- Save changes button--> */}
                  <button className="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdithProfileScreen;
