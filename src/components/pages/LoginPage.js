import LayoutLoginForm from "../login/layout-login-form";
import classes from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../lib/api-login";
// Tiêu chí số 3: Dùng Session hoặc Cookie để lưu trữ dữ liệu người dùng hiện tại

const LoginPage = () => {
  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const { isLoggedIn, isExistedUser, isWrongPassword } = useSelector(
    (state) => state.logInReducer
  );
  const emailRef = useRef();
  const passRef = useRef();
  const validForm = validEmail && validPass;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpHandler = () => {
    navigate("/register");
  };
  useEffect(() => {
    dispatch({ type: "ACTIVE_LOGIN_PAGE" });
    emailRef.current.focus();
  }, [dispatch]);

  if (isLoggedIn) {
    navigate("/");
  }
  // check empty
  const isEmpty = (inputValue) => {
    if (inputValue.trim() === "") {
      return true;
    }
    return false;
  };

  const signInHandler = (e) => {
    e.preventDefault();

    if (validForm) {
      dispatch(
        loginAPI({
          email: emailRef.current.value,
          password: passRef.current.value,
        })
      );
    }
  };
  const handlingOnBlurEmail = (e) => {
    if (isEmpty(e.target.value) || !e.target.value.includes("@")) {
      setValidEmail(false);
      return;
    }
    setValidEmail(true);
  };
  const handlingOnBlurPass = (e) => {
    if (isEmpty(e.target.value) || e.target.value.length < 6) {
      setValidPass(false);
      return;
    }
    setValidPass(true);
  };
  return (
    <div className={classes.login}>
      <LayoutLoginForm>
        <form className={classes.form} onSubmit={signInHandler}>
          <label>Sign In</label>
          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            onBlur={handlingOnBlurEmail}
            className={!validEmail ? classes.error : ""}
          />
          {!validEmail && (
            <div className={classes["error-massage"]}>
              The email is invalid, please check again
            </div>
          )}
          {!isExistedUser && (
            <div className={classes["error-massage"]}>
              The user is not existed, try again or sign up now!
            </div>
          )}

          <input
            type="password"
            placeholder="Password"
            ref={passRef}
            onBlur={handlingOnBlurPass}
            className={!validPass ? classes.error : ""}
          />
          {!validPass && (
            <div className={classes["error-massage"]}>
              The password is not empty and at least 8 character.
            </div>
          )}
          {isWrongPassword && (
            <div className={classes["error-massage"]}>
              The password is wrong, try again.
            </div>
          )}
          <button className={!validForm ? classes["invalid-form"] : ""}>
            SIGN IN
          </button>
          <p>
            Create an account? <span onClick={signUpHandler}>Sign up</span>
          </p>
        </form>
      </LayoutLoginForm>
    </div>
  );
};
export default LoginPage;
