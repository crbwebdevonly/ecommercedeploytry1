import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { userRegisterCall } from "../../axios/userAPI";
import "./RegisterPage.scss";

const RegisterPage = () => {
     //======================================================
     //======================================================
     const [passwordShow1, setPasswordShow1] = useState(false);
     const [passwordShow2, setPasswordShow2] = useState(false);
     const [trySubmit, setTrySubmit] = useState(false);
     const [dataValid, setDataValid] = useState(false);
     const [registrationFail, setRegistrationFail] = useState(true);
     //======================================================
     const [email, setEmail] = useState("");
     const [username, setUsername] = useState("");
     const [errorUsername, setErrorUsername] = useState("");
     const [error1, setError1] = useState("");
     const [error2, setError2] = useState("");
     const [error3, setError3] = useState("");
     const [password1, setPassword1] = useState("");
     const [password2, setPassword2] = useState("");

     const [userCred, setUserCred] = useState({
          email: "",
          username: "",
          password1: "",
          password2: "",
     });
     const [errors, setErrors] = useState({
          // emailError: "",
          // usernameError: "",
          // password1Error: "",
          // password2Error: "",
     });
     //======================================================
     let nav = useNavigate();

     //======================================================
     //======================================================
     const handleChange = (e) => {
          setUserCred((p) => ({ ...p, [e.target.name]: e.target.value }));
     };
     //======================================================
     //======================================================
     //======================================================
     const handleSubmit = (e) => {
          e.preventDefault();
          // console.log("handlesubmit ran");

          const verifyCred = {
               ...userCred,
               email: userCred.email.toLowerCase(),
          };
          validCheck(verifyCred);

          setTrySubmit(true);
     };
     //======================================================
     //======================================================
     // useEffect(() => {
     //      // effect
     //      console.log("effect dataValid ran");
     //      if (trySubmit && dataValid) {
     //           console.log("valid Register submit cred>>", userCred);
     //      }
     //      return () => {
     //           // cleanup
     //      };
     // }, [trySubmit, dataValid]);
     //======================================================
     //
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          // console.log("effect run");
          if (trySubmit) {
               if (
                    !errors.emailError &&
                    !errors.usernameError &&
                    !errors.password1Error &&
                    !errors.password2Error
               ) {
                    const sendUserCred = {
                         email: userCred.email.toLowerCase(),
                         username: userCred.username,
                         password: userCred.password1,
                    };
                    console.log("valid Register submit cred>>", sendUserCred);
                    userRegisterCall(sendUserCred);
                    setTimeout(() => {
                         // nav("/");
                    }, 3000);
               }
          }
          return () => {
               // cleanup
          };
     }, [trySubmit, errors, userCred]);
     //======================================================
     const validCheck = ({ email, username, password1, password2 }) => {
          // console.log("validCHECK ran");
          const emailValidRegex2 =
               /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!email) {
               setErrors((p) => ({
                    ...p,
                    emailError: "please provide email",
               }));
          }
          if (email) {
               if (!emailValidRegex2.test(email)) {
                    setErrors((errors) => ({
                         ...errors,
                         emailError: "please provide VALID email",
                    }));
               }
               if (emailValidRegex2.test(email)) {
                    setErrors((errors) => ({
                         ...errors,
                         emailError: "",
                    }));
               }
          }
          //
          if (!username) {
               setErrors((errors) => ({
                    ...errors,
                    usernameError: "please provide username",
               }));
          }
          if (username && (username.length < 4 || username.length > 8)) {
               setErrors((errors) => ({
                    ...errors,
                    usernameError: "username must be between 4 to 8 characters",
               }));
          }
          if (username && username.length >= 4 && username.length <= 8) {
               setErrors((errors) => ({
                    ...errors,
                    usernameError: "",
               }));
          }
          //

          if (!password1) {
               setErrors((errors) => ({
                    ...errors,
                    password1Error: "please provide password",
               }));
          }
          if (password1) {
               setErrors((errors) => ({
                    ...errors,
                    password1Error: "",
               }));
          }
          if (password2 !== password1) {
               setErrors((errors) => ({
                    ...errors,
                    password2Error: "passwords do not match",
               }));
          }
          if (password1 && password1 === password2) {
               setErrors((errors) => ({
                    ...errors,
                    password2Error: "",
               }));
          }

          if (
               errors.emailError ||
               errors.usernameError ||
               errors.password1Error ||
               errors.password2Error
          )
               return false;
          if (
               !errors.emailError &&
               !errors.usernameError &&
               !errors.password1Error &&
               !errors.password2Error
          )
               return true;
     };
     //======================================================
     //======================================================
     console.log(userCred);
     console.log(errors);
     //======================================================
     return (
          <div className="RegisterPage-container">
               <h1>Registration details </h1>
               <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-item">
                         <label htmlFor="">email</label>
                         <input
                              type="text"
                              value={userCred.email}
                              name="email"
                              onChange={(e) => {
                                   handleChange(e);
                              }}
                         />
                         <div className="error-message">
                              {errors.emailError}
                         </div>
                    </div>
                    <div className="form-item">
                         <label htmlFor="">username</label>
                         <input
                              type="text"
                              name="username"
                              value={userCred.username}
                              onChange={(e) => {
                                   handleChange(e);
                              }}
                         />
                         <div className="error-message">
                              {errors.usernameError}
                         </div>
                    </div>
                    <div className="form-item">
                         <label htmlFor="">password</label>
                         <div className="password-wrap">
                              <input
                                   type={passwordShow1 ? "text" : "password"}
                                   name="password1"
                                   value={userCred.password1}
                                   onChange={(e) => {
                                        handleChange(e);
                                   }}
                              />
                              {userCred.password1 &&
                                   (passwordShow1 ? (
                                        <i
                                             class="far fa-eye-slash"
                                             onClick={() => {
                                                  setPasswordShow1(false);
                                             }}
                                        ></i>
                                   ) : (
                                        <i
                                             class="far fa-eye"
                                             onClick={() => {
                                                  setPasswordShow1(true);
                                             }}
                                        ></i>
                                   ))}
                         </div>
                         <div className="error-message">
                              {errors.password1Error}
                         </div>
                    </div>
                    <div className="form-item">
                         <label htmlFor="">Confirm password</label>
                         <div className="password-wrap">
                              <input
                                   type={passwordShow2 ? "text" : "password"}
                                   value={userCred.password2}
                                   name="password2"
                                   onChange={(e) => {
                                        handleChange(e);
                                   }}
                              />
                              {userCred.password2 &&
                                   (passwordShow2 ? (
                                        <i
                                             class="far fa-eye-slash"
                                             onClick={() => {
                                                  setPasswordShow2(false);
                                             }}
                                        ></i>
                                   ) : (
                                        <i
                                             class="far fa-eye"
                                             onClick={() => {
                                                  setPasswordShow2(true);
                                             }}
                                        ></i>
                                   ))}
                         </div>
                         <div className="error-message">
                              {errors.password2Error}
                         </div>
                    </div>
                    <button>Register Me</button>
                    {registrationFail && (
                         <div className="error-message2">
                              Registration Failed
                         </div>
                    )}
                    {registrationFail && (
                         <div className="error-message2">
                              Please enter correct details
                         </div>
                    )}
               </form>
          </div>
     );
};

export default RegisterPage;
