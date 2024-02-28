import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CartPage.module.css";
import BannerShop from "../banner/BannerShop";
import CartTable from "../cart/cart-table";
import CartTotal from "../cart/cart-total";
import { useEffect } from "react";

import environment from "../../environment";

const CartPage = () => {
  // const cart = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.logInReducer);
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);
  const url = `${environment.api.url}${environment.api.cart.getCartUser}`;

  useEffect(() => {
    // dispatch({ type: "ACTIVE_CART_PAGE" });

    const callApi = async () => {
      console.log(user.userId);
      console.log(user.token);

      let res = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": user.token,
          "User": user.userId
        }
      })

      if(!res.ok) throw new Error("Call api unsuccess");
      let {status, cart} = await res.json();
      
      if(status) {
        setCart(cart.collections);
      }

    }

    callApi();
  }, []);

  // console.log("CHECK listCart: ", cart.listCart);
  // console.log("Check total: ", cart.total);
  return (
    <div className={classes["cart-container"]}>
      <BannerShop text={{ left: "Cart", right: "Cart" }} />
      <div className={classes["shopping-cart"]}>SHOPPING CART</div>
      <div className={classes["cart-content"]}>
        <div className={classes["cart-table-container"]}>
          <CartTable cart={cart} />
        </div>
        {/* <div className={classes["cart-total"]}>
          <CartTotal price={cart.total} />
        </div> */}
      </div>
    </div>
  );
};
export default CartPage;
