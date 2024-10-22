import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
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
            <Link className="text-primary" to="/forgot-password">
              Forgot Password
            </Link>
            <ReactFacebookLogin
              appId="2172751213095985"
              fields="name,email,picture"
              callback={(response) => {
                console.log(response);
                let { email, name, id } = response;
                let payload = { email, name, id };
                loginFacebookAPI(payload)
                  .then((result) => {
                    //Lưu access token vào local Storage
                    localStorage.setItem("LOGIN_USER", result.token);

                    //hiển thị login fb thành công
                    toast.success(result.message);

                    //navigate về trang home
                    navigate("/");
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.message);
                  });
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
