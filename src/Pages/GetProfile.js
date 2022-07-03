import React, { useEffect, useState } from "react";
import Headers from "./Headers";
import puyol from "../Asset/puyol.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetAuserPosts from "../Screens/GetAuserPosts";

const GetProfile = ({ posty }) => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});

  // const navigate = useNavigate();

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(true);
  const { id } = localStorage.getItem("userId");
  const data = {
    _id: localStorage.getItem("userId"),
  };
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `/api/users/${localStorage.getItem("userId")}`
      );
      setUser(data);

      // setLoading(false);
      // setError(false);
    };
    fetchUser();
  }, [id]);
  return (
    <div>
      <Headers />
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#0096ff" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <img
                      src={user.profilePicture}
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "150px", zIndex: "1" }}
                    />
                    {userId ? (
                      <Link to="/editprofile">
                        {" "}
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          data-mdb-ripple-color="dark"
                          style={{ zIndex: "1" }}
                        >
                          Edit profile
                        </button>
                      </Link>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>{user.username}</h5>
                    <h5>{user.city}</h5>
                    <p>{user.country} </p>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">254</p>
                      {/* <p className="mb-1 h5">{user.followers.length}</p> */}
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5"> 234 </p>
                      {/* <p className="mb-1 h5"> {user.followings.length} </p> */}
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <p className="font-italic mb-1">{user.desc}</p>
                      <p className="font-italic mb-1">{user.phoneNumber}</p>
                      <p className="font-italic mb-0">{user.email}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </p>
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <GetAuserPosts />
                      {/* <img
                        src={puyol}
                        alt="image 1"
                        className="w-100 rounded-3"
                      /> */}
                    </div>
                    <div className="col mb-2">
                      <img
                        src={puyol}
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <img
                        src={puyol}
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                    <div className="col">
                      <img
                        src={puyol}
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </div>
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

export default GetProfile;
