import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./order-table.module.css";

const OrderTable = (props) => {
  const { user } = useSelector((state) => state.logInReducer);
  const { listOrders } = useSelector((state) => state.orderReducer);
  const navigate = useNavigate();

  // Handle onClick delete
  const viewHandler = (item) => {
    navigate(`/order/detail/${item._id}`);
  };

  // create data row inside table
  const tableData = listOrders.map((item, index) => {
    // total price
    const totalPrice = item.products.reduce((total, product) => {
      return (total += product.quantity * product.product_id.price);
    }, 0);
    return (
      <tr key={index}>
        <td>{item._id}</td>
        <td className={classes.price}>
          {/* {Intl.NumberFormat("vi").format(Number(item.product.price))} VND */}
          {user.userId}
        </td>
        <td className={classes.total}>{user.fullName}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.address}</td>
        <td>{Intl.NumberFormat("vi").format(totalPrice)} VND</td>
        <td>{item.delivery}</td>
        <td>{item.status}</td>
        <td>
          <span
            className={classes["view"]}
            onClick={viewHandler.bind(null, item)}
          >
            View --&gt;
          </span>
        </td>
      </tr>
    );
  });
  // console.log("CHECK MAP: ", tableData.length);
  return (
    <>
      {/* Table */}
      <table className={classes["order-table"]}>
        <thead>
          <tr className={classes.header}>
            <th width="15%">ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length !== 0 ? (
            tableData
          ) : (
            <td colSpan={6}>The order is empty</td>
          )}
        </tbody>
      </table>
    </>
  );
};
export default OrderTable;
