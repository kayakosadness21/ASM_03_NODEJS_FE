import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import cartReducer from "./cart-reducer";
import orderReducer from "./order-reducer";
import productDetailReducer from "./product-detail-reducer";
import logInReducer from "./login-reducer";
import navBarActiveReducer from "./nav-bar-active-reducer";
import chatReducer from "./chat-reducer";

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("cartState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}
// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadCartFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("cartState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
const store = createStore(
  combineReducers({
    cartReducer,
    orderReducer,
    productDetailReducer,
    logInReducer,
    navBarActiveReducer,
    chatReducer,
  }),
  loadCartFromLocalStorage(),
  applyMiddleware(thunk)
);

// listen for store change and use saveToLocalStore to save them to localStore
store.subscribe(() => saveToLocalStorage(store.getState()));
// console.log("CHECK STORE: ", store.getState());
export default store;
