import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import BannerShop from "../banner/BannerShop";
import MenuShop from "../menu/menu-shop";
import ProductsListShop from "../products/products-list-shop";
import classes from "./ShopPage.module.css";
import { getProducts } from "../lib/api";
import Pagination from "../page/pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ShopPage = () => {
  const { data, error, status, sendRequest } = useHTTP(getProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDidMount, setIsDidMount] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // send active ShopPage to redux
  useEffect(() => {
    dispatch({ type: "ACTIVE_SHOP_PAGE" });
  }, [dispatch]);
  // load data when componentDidMount
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // navigate to detail page
  const showDetailHandler = (id) => {
    navigate(`/detail/${id}`);
  };
  // Fillter products by name of category
  const categoryHandler = (nameOfCategory) => {
    // Show all products when click 'All'
    if (nameOfCategory === "all") {
      setFilteredProducts([...data]);
      setIsDidMount(true);
      return;
    }
    // Show products by name of category
    setIsDidMount(false);
    const listProduct = data.filter((item) => item.category === nameOfCategory);
    setFilteredProducts([...listProduct]);
  };
  // Filter product by name
  const searchHandler = (e) => {
    const inputName = e.target.value;
    setIsDidMount(false);
    const listProduct = data.filter((item) => {
      return item.name.toLowerCase().includes(inputName.toLowerCase());
    });
    setFilteredProducts([...listProduct]);
  };
  const sortingHandler = () => {
    alert("Waiting for dev");
  };

  return (
    <div className={classes["shop-container"]}>
      {/* Banner */}
      {!isDidMount && <BannerShop text={{ left: "SHOP" }} />}
      {/* Content */}
      <div className={classes.content}>
        {/* Manu */}
        <MenuShop onCategoryFilter={categoryHandler} />
        {/* Product list */}
        <div className={classes["show-products"]}>
          <div className={classes.search}>
            <input
              placeholder="Enter Search Here"
              onChange={searchHandler}
            ></input>
            <select onChange={sortingHandler}>
              <option>Default sorting</option>
              <option>Sorting by name</option>
              <option>Sorting by rate</option>
            </select>
          </div>
          {status === "pending" && <p>Loading...</p>}
          {status === "completed" && error && <p>{error}</p>}
          {status === "completed" && data && data.length > 0 && (
            <ProductsListShop
              products={isDidMount ? data : filteredProducts}
              onShowDetail={showDetailHandler}
            />
          )}

          {/* {!isDidMount && status === "completed" && data && data.length > 0 && (
            <ProductsListShop
              products={filteredProducts}
              onShowDetail={showDetailHandler}
            />
          )} */}
          <Pagination
            productPage={data && isDidMount ? data : filteredProducts}
          />
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
