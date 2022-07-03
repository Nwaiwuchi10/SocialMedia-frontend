import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "../Components/FormContainer";

import CircularIndeterminate from "../Components/Progress";
import axios from "axios";

toast.configure();

const StudentSignup = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [mode, setMode] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (mode === "password") {
      setMode("text");
    } else {
      setMode("password");
    }
  };
  const handleClick2 = () => {
    if (mode === "password") {
      setMode("text");
    } else {
      setMode("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      username: username,
      password: password,
      confirmpassword: confirmpassword,
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post("/api/auth/register", data, headers)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setEmail("");
          setUserName("");
          setPassword("");
          setConfirmpassword("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);

          localStorage.setItem("email", res.data.email);
          localStorage.setItem("Verified", res.data.Verified);
          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("phoneNumber", res.data.phone);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("profilePicture", res.data.profilePicture);
          localStorage.setItem("coverPicture", res.data.coverPicture);
          localStorage.setItem("Followers", res.data.followers);
          localStorage.setItem("Following", res.data.following);

          console.log(res.data);
          toast.success("Sign Up successful");
          navigate("/dashboard");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Invalid UserDetails, SignUp Failed");
      });
  };

  return (
    // <div className="split">
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: `url(
        "https://media.istockphoto.com/photos/sharp-pencil-and-pie-chart-on-green-grass-texture-background-picture-id544096202?k=20&m=544096202&s=170667a&w=0&h=hNZ0cT2dPAnnPb_o9fIvhghkIK4vSuTAh_DHAaOW_Qw="
      )`,
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <FormContainer>
                  <h1>Sign Up</h1>
                  {loading && <CircularIndeterminate />}
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your User Name  "
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="registrationNumber">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Email Adress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type={mode}
                        required
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                      {mode === "password" ? (
                        <VisibilityIcon
                          className="icon"
                          onClick={handleClick}
                        />
                      ) : (
                        <VisibilityOff className="icon" onClick={handleClick} />
                      )}
                    </Form.Group>
                    <Form.Group controlId="confirmpassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type={mode}
                        required
                        placeholder="Enter password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                      ></Form.Control>
                      {mode === "password" ? (
                        <VisibilityIcon
                          className="icon2"
                          onClick={handleClick2}
                        />
                      ) : (
                        <VisibilityOff
                          className="icon2"
                          onClick={handleClick2}
                        />
                      )}
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Sign Up
                    </Button>
                  </Form>
                  <Row className="py-3">
                    <Col>
                      New User?<Link to="/">Login </Link>{" "}
                    </Col>
                  </Row>
                </FormContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // </div>
  );
};

export default StudentSignup;
