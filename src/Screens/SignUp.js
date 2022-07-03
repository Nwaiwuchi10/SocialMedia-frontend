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

toast.configure();

const SignUp = () => {
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

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: username,
      email: email,
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
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("email", res.data.email);

          console.log(res.data);
          toast.success("Sign Up successful");
          navigate("/dashboard");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Sign Up failed");
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
                    {loading && <CircularIndeterminate />}
                    <form onSubmit={HandleSubmit}>
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
                      {mode === "password" ? (
                        <VisibilityIcon
                          className="icon"
                          onClick={handleClick}
                        />
                      ) : (
                        <VisibilityOff className="icon" onClick={handleClick} />
                      )}

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
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>
                    </form>
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

export default SignUp;
