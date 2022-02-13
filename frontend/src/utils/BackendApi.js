import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
      "Accept":"*/*",
    "Content-type": "application/json"
  },
});

API.interceptors.request.use((request) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (loggedInUser && loggedInUser.hasOwnProperty("accessToken")) {
    request.headers.Authorization = `Bearer ${loggedInUser.accessToken}`;
    request.headers['Access-Control-Allow-Origin']=true;
  }

  return request;
});

API.interceptors.response.use((response) => {
  // if(response instanceof Object){
  //   console.log(true,JSON.stringify(response));
  // }
  // console.log(response.data);
  return response;
});

export default API;
