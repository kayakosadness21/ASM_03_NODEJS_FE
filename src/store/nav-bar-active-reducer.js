const initialNavBar = {
  homePage: false,
  shopPage: false,
  cartPage: false,
  loginPage: false,
  orderPage: false,
};

const navBarActiveReducer = (state = initialNavBar, action) => {
  switch (action.type) {
    case "ACTIVE_HOME_PAGE":
      return {
        homePage: true,
        shopPage: false,
        cartPage: false,
        loginPage: false,
        orderPage: false,
      };
    case "ACTIVE_SHOP_PAGE":
      return {
        homePage: false,
        shopPage: true,
        cartPage: false,
        loginPage: false,
        orderPage: false,
      };
    case "ACTIVE_CART_PAGE":
      //   console.log("before active");
      return {
        homePage: false,
        shopPage: false,
        cartPage: true,
        loginPage: false,
        orderPage: false,
      };
    case "ACTIVE_LOGIN_PAGE":
      return {
        homePage: false,
        shopPage: false,
        cartPage: false,
        loginPage: true,
        orderPage: false,
      };
    case "ACTIVE_ORDER_PAGE":
      return {
        homePage: false,
        shopPage: false,
        cartPage: false,
        loginPage: false,
        orderPage: true,
      };
    default:
      return state;
  }
};
export default navBarActiveReducer;
