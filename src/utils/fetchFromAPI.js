import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
// define function call api get list video tu BE
export const getVideosAPI = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/video/get-videos`);
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("error api get list video");
  }
};

//define function call api get list type video
export const getTypeVideoAPI = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-types`);
    return data;
  } catch (err) {
    console.log("error api get list type");
  }
};

//define function call api get list video by type_id tu BE
export const getVideosTypeIdAPI = async (typeId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-videos/${typeId}`);
    return data;
  } catch (err) {
    console.log("error api get list video by type_id");
  }
};

export const getVideoById = async (videoId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-video/${videoId}`);
    return data;
  } catch (err) {
    console.log("err api get video by id");
  }
};

export const signUpAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, payload);
    return data;
  } catch (err) {
    console.log("error api sign up");
    throw err;
  }
};

export const loginAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, payload);
    return data;
  } catch (err) {
    console.log("error api login");
    throw err;
  }
};
