import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./Login.css";
import CircularIndeterminate from "../Components/Progress";

toast.configure();
const LoginScreen = () => {
  const navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [mode, setMode] = useState("password");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate, userId]);
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
          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("phoneNumber", res.data.phoneNumber);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("city", res.data.city);
          localStorage.setItem("country", res.data.country);
          localStorage.setItem("profilePicture", res.data.profilePicture);
          localStorage.setItem("coverPicture", res.data.coverPicture);
          localStorage.setItem("Verified", res.data.Verified);
          localStorage.setItem("Followers", res.data.followers);
          localStorage.setItem("Following", res.data.following);

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
      {/* <!-- Section: Design Block --> */}
      <section className="background-radial-gradient overflow-hidden">
        {/* </style> */}

        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                LetsMeet Connects <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  You To The World
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                With LetsMeet, you'll get an easy, fast, secure messaging and
                calling for free*, available on phones all over the world.
                connecting you to the world is our number one priority.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  {loading && <CircularIndeterminate />}
                  <form onSubmit={submitHandler}>
                    {/* <!-- Email input --> */}
                    <label className="form-label" for="form3Example3">
                      Email address
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        placeholder="Enter your Email  "
                        id="form3Example3"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {/* <!-- Password input --> */}
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                    <div className="form-outline mb-4">
                      <input
                        type={mode}
                        required
                        placeholder="Enter password"
                        id="form3Example4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    {mode === "password" ? (
                      <VisibilityIcon
                        style={{
                          display: "flex",
                          position: "relative",
                          top: "-90px",
                          left: "400px",
                          color: "black",
                        }}
                        onClick={handleClick}
                      />
                    ) : (
                      <VisibilityOff
                        style={{
                          display: "flex",
                          position: "relative",
                          top: "-90px",
                          left: "400px",
                          color: "black",
                        }}
                        onClick={handleClick}
                      />
                    )}
                    {/* -- Checkbox --  */}
                    {/* <div class="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example33"
                        checked
                      />
                      <label className="form-check-label" for="form2Example33">
                        Subscribe to our newsletter
                      </label>
                    </div> */}
                    {/* <!-- Submit button --> */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Login
                    </button>
                    <div>
                      New User?<Link to="/signup">Signup </Link>
                    </div>

                    {/* <!-- Register buttons --> */}
                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-google"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-github"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginScreen;
