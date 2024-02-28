import { useSelector, useDispatch } from "react-redux";
import BannerShop from "../banner/BannerShop";
import BillingForm from "../checkout/billing-form";
import OrderDetail from "../checkout/order-detail";
import classes from "./CheckoutPage.module.css";
import useHTTP from "../hooks/use-http";
import { addNewOrder } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.logInReducer);
  const { data, sendRequest } = useHTTP(addNewOrder);
  // const dataString = "";
  const handleSubmitOrder = (user) => {
    // alert("am here");
    sendRequest({ user: user, cart: cart });
  };
  useEffect(() => {
    if (data && data.message === "ok") {
      alert("Order is succeed. Please check email to confirm order");
      dispatch({ type: "CLEAR_CART" });
      navigate("/shop");
    }
  }, [data, dispatch, navigate]);
  // console.log("CHECK DATA res: ", data);

  return (
    <div className={classes["checkout-container"]}>
      <BannerShop text={{ left: "CHECKOUT", path: "HOME / CART /" }} />
      <p>BILLING DETAILS</p>
      <div className={classes["billing-detail"]}>
        <div className={classes["billing-form"]}>
          <BillingForm user={user} onSubmit={handleSubmitOrder} />
        </div>
        <div className={classes["order-detail"]}>
          <OrderDetail
            cart={cart}
            resData={data && data.message === "ok" ? null : data}
          />
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
