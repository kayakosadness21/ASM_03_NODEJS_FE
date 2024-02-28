const initialState = {
  productDetail: {},
  isShowPopup: false,
};

const productDetailReducer = (state = initialState, action) => {
  if (action.type === "SHOW_POPUP") {
    return {
      isShowPopup: true,
      productDetail: { ...action.value },
    };
  }
  if (action.type === "HIDE_POPUP") {
    return {
      isShowPopup: false,
      productDetail: {},
    };
  }
  return state;
};
export default productDetailReducer;
