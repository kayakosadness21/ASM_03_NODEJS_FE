import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NumberOfItemInCart from "../cart/number-item-in-cart";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { homePage, shopPage, cartPage, loginPage, orderPage } = useSelector(
    (state) => state.navBarActiveReducer
  );
  const { isLoggedIn, user } = useSelector((state) => state.logInReducer);
  const [active, setActive] = useState();
  useEffect(() => {
    return () => {
      setActive(null);
    };
  });

  // handle onClick and navigate to page
  const onClickHandler = (e) => {
    //get name attribute
    const nameOftarget = e.target.getAttribute("name");
    setActive(nameOftarget);
    switch (nameOftarget) {
      case "home":
        navigate("/");
        break;
      case "shop":
        navigate("/shop");
        break;
      case "order":
        navigate("/order");
        break;
      case "cart":
        navigate("/cart");
        break;
      case "login":
        navigate("/login");
        break;
      case "logout":
        dispatch({ type: "ON_LOGOUT" });
        dispatch({ type: "CLEAR_CART" });
        navigate("/");
        break;
      default:
        navigate("/");
    }
  };
  return (
    // NavBar container
    <div className={classes.container}>
      {/* Navbar left */}
      <ul className={classes["nav-bar-left"]}>
        <li
          onClick={onClickHandler}
          name="home"
          // className={active === "home" || homePage ? classes.active : null}
          className={homePage ? classes.active : null}
        >
          Home
        </li>
        <li
          onClick={onClickHandler}
          name="shop"
          // className={active === "shop" || shopPage ? classes.active : null}
          className={shopPage ? classes.active : null}
        >
          Shop
        </li>
      </ul>

      {/* Navbar center */}
      <div className={classes["nav-bar-center"]}>BOUTIQUE</div>

      {/* Navbar right */}
      <ul className={classes["nav-bar-right"]}>
        {isLoggedIn && (
          <li className={orderPage ? classes.active : null}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className={classes["list-icon"]}
            >
              <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
            </svg>
            <div name="order" onClick={onClickHandler}>
              Order List
            </div>
          </li>
        )}
        <li
          className={cartPage ? classes.active : null}
          // className={active === "cart" || cartPage ? classes.active : null}
        >
          <svg
            className={classes["cart-icon"]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              name="cart"
              onClick={onClickHandler}
              d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64H48c8.8 0 16 7.2 16 16V368c0 44.2 35.8 80 80 80h18.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H450.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H144c-8.8 0-16-7.2-16-16V80C128 35.8 92.2 0 48 0H32zM192 80V272c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H464V176c0 5.9-3.2 11.3-8.5 14.1s-11.5 2.5-16.4-.8L400 163.2l-39.1 26.1c-4.9 3.3-11.2 3.6-16.4 .8s-8.5-8.2-8.5-14.1V32H240c-26.5 0-48 21.5-48 48z"
            />
          </svg>
          <div name="cart" onClick={onClickHandler}>
            Cart
          </div>
          <NumberOfItemInCart />
        </li>
        {!isLoggedIn && (
          <li
            className={active === "login" || loginPage ? classes.active : null}
          >
            <svg
              className={classes["login-icon"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                name="login"
                onClick={onClickHandler}
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
            <div name="login" onClick={onClickHandler}>
              Login
            </div>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <svg
              className={classes["login-icon"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <div onClick={onClickHandler}>
              {user.fullName}
              <svg
                className={classes["login-icon-arrow-down"]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
              </svg>
              <span name="logout">(Logout)</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
export default NavBar;
