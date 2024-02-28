import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputOrderedProducts from "../UI/InputOrderedProducts";
import classes from "./cart-table.module.css";

const CartTable = (props) => {
  const { isLoggedIn } = useSelector((state) => state.logInReducer);
  const dispatch = useDispatch();
  // const { listCart } = props.cart;
  const navigate = useNavigate();
  // console.log("CHECK CART in CART_TABLE: ", listCart);

  // Handle onClick delete
  const deleteHandler = (item) => {
    // const { quantity, product } = item;
    // if (window.confirm(`Do you want to delete product '${product.name}'?`)) {
    //   dispatch({
    //     type: "DELETE_CART",
    //     value: {
    //       id: product._id,
    //       total: quantity * product.price,
    //       quantity: quantity,
    //     },
    //   });
    // }
  };
  // Handle onClick increase quantity
  const increaseHandler = (item) => {
    // const { product } = item;
    // dispatch({
    //   type: "INCREASE_QUANTITY",
    //   value: { id: product._id, price: product.price },
    // });
  };
  const decreaseHandler = (item) => {
    // const { product } = item;
    // dispatch({
    //   type: "DECREASE_QUANTITY",
    //   value: { id: product._id, price: product.price },
    // });
  };
  // Handle onclick left footer
  const leftFooterHandler = () => {
    navigate("/shop");
  };
  // Handle onClick right footer
  const rightFooterHandler = () => {
    // if (listCart.length === 0) {
    //   alert("Please go to shopping before check out");
    //   return;
    // }
    // if (!isLoggedIn) {
    //   alert("You have login first! thanks");
    //   return;
    // }
    // navigate("/checkout");
  };

  // create data row inside table
  const tableData = props.cart.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <img src={item.product.images[0]} alt={item.product.name} />
        </td>
        <td className={classes.product}>{item.product.name}</td>
        <td className={classes.price}>
          {Intl.NumberFormat("vi").format(Number(item.product.price))} VND
        </td>
        <td>
          <InputOrderedProducts
            quantity={item.quantity}
            onIncreaseHandler={increaseHandler.bind(null, item)}
            onDecreaseHandler={decreaseHandler.bind(null, item)}
            isInCartTable={true}
          />
        </td>
        <td className={classes.total}>
          {Intl.NumberFormat("vi").format(
            Number(item.product.price * item.quantity)
          )}{" "}
          VND
        </td>
        <td>
          <svg
            className={classes.delete}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={deleteHandler.bind(null, item)}
          >
            <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
          </svg>
        </td>
      </tr>
    );
  });

  console.log(props.cart);

  return (
    <>
      {/* Table */}
      <table className={classes["cart-table"]}>
        <tr className={classes.header}>
          <th width="15%">IMAGE</th>
          <th>PRODUCT</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>TOTAL</th>
          <th>REMOVE</th>
        </tr>
        {tableData.length !== 0 ? (
          tableData
        ) : (
          <td colSpan={6}>The cart is empty, please go to shoping...</td>
        )}
      </table>
      
      {" "}

      {/* section footer */}
      <div className={classes.footer}>
        <div className={classes["left-footer"]} onClick={leftFooterHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M177.5 98c-8.8-3.8-19-2-26 4.6l-144 136C2.7 243.1 0 249.4 0 256s2.7 12.9 7.5 17.4l144 136c7 6.6 17.2 8.4 26 4.6s14.5-12.5 14.5-22l0-88 288 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-288 0 0-88c0-9.6-5.7-18.2-14.5-22z" />
          </svg>
          <div>Continue shopping</div>
        </div>
        <div className={classes["right-footer"]} onClick={rightFooterHandler}>
          <div>Proceed to checkout</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 88L32 208c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l288 0 0 88c0 9.6 5.7 18.2 14.5 22z" />
          </svg>
        </div>
      </div>
    </>
  );
};
export default CartTable;
