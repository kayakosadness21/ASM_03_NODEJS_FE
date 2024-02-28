import { useEffect, useRef } from "react";
import classes from "./billing-form.module.css";

const BillingForm = (props) => {
  const user = props.user;
  const refFullName = useRef(),
    refPhoneNumber = useRef(),
    refAddress = useRef();
  // when component did mount
  useEffect(() => {
    refFullName.current.value = user.fullName;
    refPhoneNumber.current.value = user.phoneNumber;
    refAddress.current.value = user.address;
  }, []);
  // check input
  const validInput = () => {
    if (
      refFullName.current.value.trim() === "" ||
      refPhoneNumber.current.value.trim() === "" ||
      refAddress.current.value.trim() === "" ||
      refPhoneNumber.current.value.match(/[^0-9]/)
    ) {
      return false;
    }
    return true;
  };
  // submit order
  const handleSubmit = (e) => {
    // console.log("CHEK VALID: ", validInput);
    e.preventDefault();
    if (!validInput()) {
      alert(
        "Please fill in all information, or may be phone number is not number"
      );
      return;
    }
    user.fullName = refFullName.current.value;
    user.phoneNumber = refPhoneNumber.current.value;
    user.address = refAddress.current.value;
    props.onSubmit(user);
  };
  return (
    <form className={classes["form-container"]} onSubmit={handleSubmit}>
      <label htmlFor="full-name">FULL NAME:</label>
      <input
        id="full-name"
        type="text"
        placeholder="Enter Your Full Name Here"
        ref={refFullName}
      />
      <label htmlFor="email">EMAIL:</label>
      <input
        id="email"
        type="email"
        placeholder="Enter Your Email Here"
        value={user.email}
      />
      <label htmlFor="phone-number">PHONE NUMBER:</label>
      <input
        id="phone-number"
        type="text"
        placeholder="Enter Your Phone Number Here"
        ref={refPhoneNumber}
      />
      <label htmlFor="address">ADDRESS:</label>
      <input
        id="address"
        type="text"
        placeholder="Enter Your Address Here"
        ref={refAddress}
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default BillingForm;
