import React, { useState } from "react";
import { useNavigate } from "react-router";
import { myaxiox2 } from "../../axios/MyAxios";
import MyInputBar from "../../components/MyInputBar";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

const AdminCreateNewUser = () => {
     //======================================================
     //======================================================
     const [user, setUser] = useState({
          username: "",
          email: "",
          password: "",
     });
     //======================================================
     // const [error, setError] = useState(false);
     //======================================================
     const [errorMessage, setErrorMessage] = useState("");
     //======================================================
     const nav = useNavigate();
     //======================================================
     const handleChange = (e) => {
          if (e.target.name === "email") {
               setUser({ ...user, email: e.target.value.toLowerCase() });
               return;
          }
          setUser({ ...user, [e.target.name]: e.target.value });
     };
     //======================================================
     //======================================================
     const handleSubmit = async () => {
          setErrorMessage("");
          if (!user.username || !user.email || !user.password) {
               setErrorMessage("error--has blank fields");
               return;
          }
          const emailREGEX =
               /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!emailREGEX.test(user.email.toLowerCase())) {
               setErrorMessage("error--invalid email");
               return;
          }
          // success
          try {
               const reply = await myaxiox2.post("/auth/register", user);
               // console.log(reply);
               nav("/adminpage/users");
          } catch (error) {}
          console.log("valid user>>", user);
     };
     //======================================================
     console.log(user);
     //======================================================
     return (
          <div className="create-new-user-container">
               <h2>create new user</h2>
               <Button>testb</Button>
               <MyInputBar name="username" handleChange={handleChange} />
               <MyInputBar name="email" handleChange={handleChange} />
               <MyInputBar name="password" handleChange={handleChange} />

               <button className="btn btn-secondary" onClick={handleSubmit}>
                    Create
               </button>

               {errorMessage && (
                    <Alert variant="danger">
                         <Alert.Heading>{errorMessage}</Alert.Heading>
                    </Alert>
               )}
          </div>
     );
};

export default AdminCreateNewUser;
