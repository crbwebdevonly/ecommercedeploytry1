import axios from "axios";

//======================================================
//======================================================
//======================================================
const BASE_URL = "http://localhost:5000";
//======================================================
// const { loggedInUser } = useContext(UserContext);
const loggedInUser = JSON.parse(
     localStorage.getItem("crbecommerce1_loggedInUser")
);
const LoggedInUserToken = loggedInUser?.token || "crb blank";
//======================================================

export const MyAxios = axios.create({
     // baseURL: BASE_URL,
     // headers: { crb_ecommerce1_token: LoggedInUserToken },
     headers: { test123: LoggedInUserToken },
});

MyAxios.interceptors.request.use((req) => {
     req.headers.test119 = "test1234";
     return req;
});

export const myaxiox2 = axios.create({
     // baseURL: BASE_URL,
     // headers: {
     //      crb_ecommerce1_token: LoggedInUserToken,
     // },
});
myaxiox2.interceptors.request.use((req) => {
     const loggedInUser = JSON.parse(
          localStorage.getItem("crbecommerce1_loggedInUser")
     );
     const LoggedInUserToken = loggedInUser?.token || "crb blank3";
     req.headers.crb_ecommerce1_token = LoggedInUserToken;
     return req;
});
