import classes from "./order-detail.module.css";

const OrderDetail = (props) => {
  const { total, listCart } = props.cart;
  const resData = props.resData;

  const orderList = listCart.map((item, index) => {
    let error =
      resData && resData.product._id === item.product._id ? true : false;
    return (
      <>
        {error && (
          <div style={{ color: "red" }}>
            <label>
              This product in store: {resData.product.quantity}. Please reorder
              the quantity
            </label>
          </div>
        )}
        <div className={classes["list-order"]} key={index}>
          <label className={classes["name"]}>{item.product.name}</label>
          <label className={classes["price-quantity"]}>
            {Intl.NumberFormat("vi").format(item.product.price)} VND x{" "}
            {item.quantity}
          </label>
        </div>
      </>
    );
  });

  return (
    <div className={classes["order-detail-container"]}>
      <p>YOUR ORDER</p>
      {orderList}
      <div className={classes["order-detail-footer"]}>
        <label>TOTAL</label>
        <label>{Intl.NumberFormat("vi").format(total)} VND</label>
      </div>
    </div>
  );
};
export default OrderDetail;
