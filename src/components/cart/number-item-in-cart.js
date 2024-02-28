import { useSelector } from "react-redux";
import classes from "./number-item-in-cart.module.css";
import { useEffect, useRef, useState } from "react";

const NumberOfItemInCart = () => {
  const { numberOfItem } = useSelector((state) => state.cartReducer);
  const [boom, setBoom] = useState(false);
  useEffect(() => {
    if (numberOfItem !== 0) {
      setBoom(true);
    }
    setTimeout(() => {
      setBoom(false);
    }, 300);
  }, [numberOfItem]);
  return (
    <div
      className={classes["number-of-item"] + " " + classes[boom ? "boom" : ""]}
    >
      {numberOfItem}
    </div>
  );
};
export default NumberOfItemInCart;
