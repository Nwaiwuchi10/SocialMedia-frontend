import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CircularIndeterminate from "../Components/Progress";

import { Form } from "react-bootstrap";
import axios from "axios";
import { Button } from "react-bootstrap";

toast.configure();

const SignUpScreen = () => {
  const navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [mode, setMode] = useState("password");
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("id")) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect]);

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

      password: password,
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post("/api/auth/login", data, headers)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          setEmail("");

          setPassword("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("name", res.data.name);
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("phoneNumber", res.data.phone);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("profilePicture", res.data.profilePicture);
          localStorage.setItem("coverPicture", res.data.coverPicture);

          console.log(res.data);
          toast.success("Login successful");
          navigate("/dashboard");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Invalid email & Password");
      });
  };
  return (
    <div>
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
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>
                    {/* {loading && <CircularIndeterminate />} */}
                    <Form onSubmit={submitHandler}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          placeholder="Enter your UserName"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form3Example1cg">
                          Your User Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          placeholder="Enter your Email Address "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type={mode}
                          required
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form3Example4cg">
                          Password
                        </label>
                      </div>
                      {/* {mode === "password" ? (
                        <VisibilityIcon
                          className="icon"
                          onClick={handleClick}
                        />
                      ) : (
                        <VisibilityOff className="icon" onClick={handleClick} />
                      )} */}

                      <div className="form-outline mb-4">
                        <input
                          type={mode}
                          required
                          placeholder="Repeat password"
                          value={confirmpassword}
                          onChange={(e) => setConfirmpassword(e.target.value)}
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="form3Example4cdg">
                          Confirm your password
                        </label>
                      </div>
                      {/* {mode === "password" ? (
                        <VisibilityIcon
                          className="icon2"
                          onClick={handleClick2}
                        />
                      ) : (
                        <VisibilityOff
                          className="icon2"
                          onClick={handleClick2}
                        />
                      )} */}
                      {/* <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          for="form2Example3g"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div> */}

                      <div className="d-flex justify-content-center">
                        <Button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </Button>
                      </div>
                    </Form>
                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      {/* <a href="#!" className="fw-bold text-body"> */}
                      <Link to="/">
                        <u>Login here</u>
                      </Link>
                      {/* </a> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpScreen;
