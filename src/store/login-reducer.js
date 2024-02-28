const initialStateLogin = {
  user: null,
  isLoggedIn: false,
  isExistedUser: true,
  isWrongPassword: false,
};
// user={
//     name: string
//     email: String
//     pass: String
//     phone: string
//     active: false
// }
const loginReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      return {
        user: { ...action.payload.user },
        isLoggedIn: true,
        isExistedUser: true,
        isWrongPassword: false,
      };
    case "ON_LOGOUT":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: true,
        isWrongPassword: false,
      };
    case "NOT_EXISTED_USER":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: false,
        isWrongPassword: false,
      };

    case "WRONG_PASSWORD":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: true,
        isWrongPassword: true,
      };
    case "INVALID_EMAIL":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: false,
        isWrongPassword: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
