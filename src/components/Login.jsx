import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let email = document.getElementById("email").value;
                let pass_word = document.getElementById("pass").value;
                let payload = { email, pass_word };

                loginAPI(payload)
                  .then((res) => {
                    console.log(res);
                    toast.success(res.message);
                    //Lưu token vào local storage
                    localStorage.setItem("LOGIN_USER", res.token);

                    navigate("/"); // chuyển sang trang chủ
                  })
                  .catch((err) => {
                    toast.error(err.ressponce.data.message);
                  });
              }}
            >
              Login
            </button>
            <ReactFacebookLogin
              appId="2172751213095985"
              fields="name,email,picture"
              callback={(response) => {
                console.log(response);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
