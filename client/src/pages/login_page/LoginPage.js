import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { MyAxios } from "../../axios/MyAxios";
import { userLoginCall } from "../../axios/userAPI";
import LogoutModal from "../../components/LogoutModal";
import { UserContext } from "../../context/UserContext";
import "./LoginPage.scss";

const LoginPage = () => {
     //======================================================
     //======================================================
     const { loggedInUser, doLogIn } = useContext(UserContext);

     //======================================================
     console.log("logged user>>", loggedInUser);
     if (loggedInUser) {
          console.log("yes user", loggedInUser);
     }
     if (!loggedInUser) {
          console.log("NO user", loggedInUser);
     }

     //======================================================
     const [passwordShow, setPasswordShow] = useState(false);
     const [trySubmit, setTrySubmit] = useState(false);
     const [effectTrigger, setEffectTrigger] = useState(false);
     const [effectTrigger2, setEffectTrigger2] = useState(false);
     const [loginFail, setLoginFail] = useState(false);
     //======================================================
     const [email, setEmail] = useState("");
     const [error1, sete1] = useState("");
     const [error2, sete2] = useState("");
     const [password, setPassword] = useState("");
     const [errors, setErrors] = useState({
          emailError: "initial",
          passwordError: "",
     });
     //======================================================
     let nav = useNavigate();
     //======================================================
     const handleSubmit = (e) => {
          e.preventDefault();
          const userCred = { email: email.toLowerCase(), password };
          // console.log("submitLogin>>", userCred);
          validCheck(userCred);
          // console.log("valid>>", validCheck(userCred));
          setTrySubmit(true);
          // setErrors({ ...errors, emailError: "eee11199999" });
          setEffectTrigger(!effectTrigger);
     };
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          // console.log("login effect ran");
          const thisLoginCall = async (userCred) => {
               try {
                    const reply = await MyAxios.post("/auth/login", userCred);

                    // console.log("reply>>", reply);
                    // if (!reply.data.loginUser) {
                    //      setLoginFail(true);
                    // }
                    if (reply.data.loginUser) {
                         // localStorage.setItem(
                         //      "crbecommerce1_loggedInUser_ID",
                         //      `${reply.data.loginUser._id}`
                         // );
                         // console.log("doing login1");
                         doLogIn({
                              ...reply.data.loginUser,
                              token: reply.data.token,
                         });
                         setLoginFail(false);
                    } else setLoginFail(true);
               } catch (error) {}
          };

          if (trySubmit) {
               if (!(error2 || error1)) {
                    const userCred = { email: email.toLowerCase(), password };
                    // console.log("valid submit cred>>", userCred);

                    thisLoginCall(userCred);
               }
          }
          return () => {
               // cleanup
          };
     }, [trySubmit, error2, error1, effectTrigger]);
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          if (loggedInUser) {
               nav("/");
          }
          return () => {
               // cleanup
          };
     }, [loggedInUser]);
     //======================================================
     //======================================================
     //======================================================
     const validCheck = ({ email, password }) => {
          const emailValidRegex2 =
               /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!email) {
               sete1("please provide email");
               // setErrors(p=>({...p, emailError:"empty mail"}))
               setErrors({ ...errors, emailError: "empty mail2" });
          }
          if (email) {
               if (!emailValidRegex2.test(email)) {
                    sete1("please provide VALID email");
               }
               if (emailValidRegex2.test(email)) {
                    sete1("");
               }
          }

          if (!password) {
               sete2("please provide password");
               setErrors({ ...errors, passwordError: "empty password" });
          }
          if (password) {
               sete2("");
          }

          if (error2 || error1) return false;
          else return true;
     };
     //======================================================
     // setErrors({ ...errors, emailError: "eee111999" });
     //======================================================
     console.log(errors);
     //======================================================
     //======================================================
     const demoAdminlogin = () => {
          const thisLoginCall = async (userCred) => {
               try {
                    const reply = await MyAxios.post("/auth/login", userCred);
                    if (reply.data.loginUser) {
                         doLogIn({
                              ...reply.data.loginUser,
                              token: reply.data.token,
                         });
                         setLoginFail(false);
                    } else setLoginFail(true);
               } catch (error) {}
          };
          thisLoginCall({ email: "email1@email1.com", password: "1" });
     };
     //======================================================
     const demoUserlogin = () => {
          const thisLoginCall = async (userCred) => {
               try {
                    const reply = await MyAxios.post("/auth/login", userCred);
                    if (reply.data.loginUser) {
                         doLogIn({
                              ...reply.data.loginUser,
                              token: reply.data.token,
                         });
                         setLoginFail(false);
                    } else setLoginFail(true);
               } catch (error) {}
          };
          thisLoginCall({ email: "email2@email2.com", password: "2" });
     };
     //======================================================
     //======================================================
     const googleLoginClick = async () => {
          try {
               const reply = await MyAxios.get("/google/auth2");
               console.log(reply);
          } catch (error) {}
     };
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="LoginPage-container">
               {/* {loggedInUser && <LogoutModal />} */}
               <h1>please login </h1>
               <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-item">
                         <label htmlFor="">email</label>
                         <input
                              type="text"
                              value={email}
                              onChange={(e) => {
                                   setEmail(e.target.value);
                              }}
                         />
                         <div className="error-message">{error1}</div>
                    </div>
                    <div className="form-item">
                         <label htmlFor="">password</label>
                         <div className="password-wrap">
                              <input
                                   type={passwordShow ? "text" : "password"}
                                   value={password}
                                   onChange={(e) => {
                                        setPassword(e.target.value);
                                   }}
                              />
                              {password &&
                                   (passwordShow ? (
                                        <i
                                             class="far fa-eye-slash"
                                             onClick={() => {
                                                  setPasswordShow(false);
                                             }}
                                        ></i>
                                   ) : (
                                        <i
                                             class="far fa-eye"
                                             onClick={() => {
                                                  setPasswordShow(true);
                                             }}
                                        ></i>
                                   ))}
                         </div>
                         <div className="error-message">{error2}</div>
                    </div>
                    <div className="btn btn-primary" onClick={googleLoginClick}>
                         Google Login
                    </div>
                    <button>Login</button>
                    {loginFail && (
                         <div className="error-message2">Login Failed</div>
                    )}
                    {loginFail && (
                         <div className="error-message2">
                              Please enter correct details
                         </div>
                    )}
                    <div className="demo">
                         <div className="demo-admin">
                              <h4 onClick={demoAdminlogin}> DemoAdmin</h4>
                         </div>
                         <div className="demo-user">
                              <h4 onClick={demoUserlogin}>DemoUser</h4>
                         </div>
                    </div>
               </form>
          </div>
     );
};

export default LoginPage;
