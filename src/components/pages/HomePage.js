import classes from "./HomePage.module.css";
import Banner from "../banner/Banner";
import iphone from "../../asset/product_1.png";
import mac from "../../asset/product_2.png";
import ipad from "../../asset/product_3.png";
import watch from "../../asset/product_4.png";
import airpod from "../../asset/product_5.png";
import { useNavigate } from "react-router-dom";
import useHTTP from "../hooks/use-http";
import { getProducts } from "../lib/api";
import { useEffect } from "react";
import ProductsList from "../products/products-list";
import { useSelector, useDispatch } from "react-redux";
import PopupProductDetail from "../popup/popup-product-detail";

const HomePage = () => {
  const { data, error, status, sendRequest } = useHTTP(getProducts);

  // get state "isShowPopup" from redux
  const isShowPopup = useSelector(
    (state) => state.productDetailReducer.isShowPopup
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set active to redux for HomePage
  useEffect(() => {
    dispatch({ type: "ACTIVE_HOME_PAGE" });
  }, [dispatch]);

  // componentDidMount
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // Naviate to shop pate when onclick to image
  const onClickHandler = () => {
    navigate("/shop");
  };

  // show detail of product by id
  const showDetailHandler = (id) => {
    const productDetail = data.filter((item) => item._id === id);
    // console.log("CHECK detai before dispatch: ", productDetail);
    // dipatch action to redux
    dispatch({ type: "SHOW_POPUP", value: productDetail[0] });
  };

  return (
    <>
      <Banner />
      {/* Section  category*/}
      <section className={classes.category}>
        <div className={classes.title1}>CAREFULLY CREATED COLLECTIONS</div>
        <div className={classes.title2}>BROWSE OUR CATEGORIES</div>
        <div className={classes["iphone-mac"]}>
          <img src={iphone} alt={"Iphone"} onClick={onClickHandler} />
          <img src={mac} alt="Mac" onClick={onClickHandler} />
        </div>
        <div className={classes["ipad-watch-airpod"]}>
          <img src={ipad} alt={"Ipad"} onClick={onClickHandler} />
          <img src={watch} alt="Watch" onClick={onClickHandler} />
          <img src={airpod} alt="Airpod" onClick={onClickHandler} />
        </div>
      </section>
      {/* Section list of products */}
      <section className={classes.products}>
        <div className={classes.title1}>MADE THE HARD WAY</div>
        <div className={classes.title2}>TOP TRENDDING PRODUCTS</div>
        {status === "pending" && <p>Loading...</p>}
        {status === "completed" && error && <p>{error}</p>}
        {status === "completed" && data && data.length > 0 && (
          <ProductsList products={data} onShowDetail={showDetailHandler} />
        )}
      </section>
      {/* Section other info */}
      <section className={classes["other-info"]}>
        <div className={classes.info}>
          <div className={classes.left}>
            <div>FREE SHIPPING</div>
            <p>Free Shipping Worlwide</p>
          </div>
          <div className={classes.center}>
            <div>24 X 7 SERVICE</div>
            <p>Free Shipping Worlwide</p>
          </div>
          <div className={classes.right}>
            <div>FESTIVAL OFFER</div>
            <p>Free Shipping Worlwide</p>
          </div>
        </div>
        <div className={classes.control}>
          <div className={classes.title}>
            <div>LET'S BE FRIEND!</div>
            <p>Nisi nisi tempor consequat laboris nisi</p>
          </div>
          <div className={classes.input}>
            <input type={"text"} placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>
      {isShowPopup && <PopupProductDetail />}
    </>
  );
};
export default HomePage;
