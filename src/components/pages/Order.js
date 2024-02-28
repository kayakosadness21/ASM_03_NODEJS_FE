import { useDispatch, useSelector } from "react-redux";
import classes from "./Order.module.css";
import BannerShop from "../banner/BannerShop";
import { useEffect } from "react";
import OrderTable from "../order/order-table";
import { orderAPI } from "../lib/api-order";
// Tiêu chí số 6: Chức năng đặt hàng
const Order = () => {
  const { user } = useSelector((state) => state.logInReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderAPI(user.userId));
  }, [dispatch, user.userId]);

  // Đặt active nhằm tạo redux cho HomePage
  useEffect(() => {
    dispatch({ type: "ACTIVE_ORDER_PAGE" });
  }, [dispatch]);

  // console.log("CHECK listCart: ", cart.listCart);
  // console.log("Check total: ", cart.total);
  return (
    <div className={classes["order-container"]}>
      <BannerShop text={{ left: "HISTORY", right: "HISTORY" }} />
      <div className={classes["order-content"]}>
        <div className={classes["order-table-container"]}>
          <OrderTable />
        </div>
      </div>
    </div>
  );
};
export default Order;
