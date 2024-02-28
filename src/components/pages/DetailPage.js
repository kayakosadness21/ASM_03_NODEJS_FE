import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHTTP from "../hooks/use-http";
import { getProducts } from "../lib/api";
import ProductDetail from "../products/product-detail";
import ProductsList from "../products/products-list";
import classes from "./DetailPage.module.css";
import { useNavigate } from "react-router-dom";
// Tiêu chí số 4:  Lấy được dữ liệu ở Database và hiển thị ra giao diện Homepage cho người dùng.
const DetailPage = () => {
  const idProduct = useParams(); 
  // Mở DB xem sao?! Trả về object {productId: parameter}
  const { data, error, status, sendRequest } = useHTTP(getProducts);
  const navigate = useNavigate();
  useEffect(() => {//idProduct.productId
    sendRequest(); 
  }, [sendRequest]);

  // Lọc chi tiết SF căn cứ id
  let productDetail = [];
  if (!error && data && data.length > 0) {
    productDetail = data.filter((item) => item._id === idProduct.productId);
  }

  // Tiêu chí số 6: Xem thông tin cụ thể của một sản phẩm - Lọc các SF liên quan
  let productsRelated = [];
  if (!error && data && data.length > 0) {
    productsRelated = data
      .filter((item) => item.category === productDetail[0].category)
      .filter((item) => item._id !== idProduct.productId);
  }
  // Chi tiết trang phải navigate
  const showDetailHandler = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div className={classes["detail-page-container"]}>
      {/* Section product-detail */}
      {status === "pending" && <p>Loading...</p>}
      {status === "completed" && error && <p>{error}</p>}
      <section className={classes["product-detail"]}>
        {productDetail.length > 0 && (
          <ProductDetail product={productDetail[0]} />
        )}
      </section>
      {/* Section product-related */}
      <section className={classes["product-related"]}>
        <div className={classes.related}>RELATED PRODUCTS</div>
        {productsRelated.length > 0 && (
          <ProductsList
            products={productsRelated}
            onShowDetail={showDetailHandler}
          />
        )}
      </section>
    </div>
  );
};
export default DetailPage;
