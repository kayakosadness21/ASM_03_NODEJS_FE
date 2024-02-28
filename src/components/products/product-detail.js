import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputOrderedProducts from "../UI/InputOrderedProducts";

import { useNavigate } from "react-router-dom";

import environment from "../../environment";
import classes from "./product-detail.module.css";
// import { saveToLocalStore } from "../../store/cart-reducer";

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const product = props.product;
  // console.log("CHECK PROPS produtt: ", product);
  const [img, setImg] = useState(0);

  const quantityRef = useRef();

  const { user } = useSelector((state) => state.logInReducer);

  // using redux to add product to cart
  const dispatch = useDispatch();

  // handle onClick small image
  const changeImageHandler = (e) => {
    setImg(e.target.dataset.img);
  };

  // format feature of product
  let featureArr = [];
  if (product.long_desc.includes("•")) {
    featureArr = product.long_desc.split("•");
  } else {
    featureArr = product.long_desc.split("-");
  }
  const featureHead = <p>{featureArr.shift()}</p>;
  const features = featureArr.map((item) => <p>- {item}</p>);

  // handle "Add to Cart"
  const addToCartHandler = async () => {
    // dispatch({
    //   type: "ADD_CART",
    //   value: { quantity: +quantityRef.current.dataset.value, product: product },
    // });

    console.log(product._id);
    console.log(user);
    let url = `${environment.api.url}${environment.api.cart.origin}`;
    console.log(url);

    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
      body: JSON.stringify({product: product._id, user: user.userId})
    })

    if(!res.ok) throw new Error("Call api unsuccess");
    let {status, message} = await res.json();
    
    if(status) {
      navigate("/cart");
    }
    
  };
  // get path image
  const pathImage = product?.images[img].includes("/images/multiple_images")
    ? process.env.REACT_APP_DOMAIN + product.images[img]
    : product.images[img];

  const smallImg = product?.images.map((img, index) => {
    const pathImage = img.includes("/images/multiple_images")
      ? process.env.REACT_APP_DOMAIN + img
      : img;
    return (
      <img
        key={index}
        src={pathImage}
        onClick={changeImageHandler}
        data-img={index}
        alt={product.name}
      />
    );
  });
  return (
    <>
      <div className={classes["detail-container"]}>
        {/* Image of product */}
        <div className={classes.image}>
          <div className={classes.large}>
            <img className={classes.img1} src={pathImage} alt={product.name} />
          </div>
          <div className={classes.small}>{smallImg}</div>
        </div>
        {/* Content of product */}
        <div className={classes.content}>
          <h2 className={classes.title}>{product.name}</h2>
          <div className={classes.price}>
            {new Intl.NumberFormat("vi").format(product.price)} VND
          </div>
          <p className={classes.desc}>{product.short_desc}</p>
          <div className={classes.category}>
            CATEGORY: <span>{product.category}</span>
          </div>
          <div className={classes["add-to-cart"]}>
            <label>QUANTITY</label>
            <InputOrderedProducts ref={quantityRef} quantity={1} />
            <button onClick={addToCartHandler}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className={classes.feature}>
        <button>DESCRIPTION</button>
        <div className={classes.description}>PRODUCT DESCRIPTION</div>
        <div className={classes["description-feature"]}>
          {featureHead}
          {features}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
