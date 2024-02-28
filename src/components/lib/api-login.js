export const loginAPI = (user) => {
  return async (dispatch) => {
    // send request to Server
    const res = await fetch(process.env.REACT_APP_DOMAIN + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // 420 = user is not existed
    if (res.status === 420) {
      dispatch({ type: "NOT_EXISTED_USER" });
      return;
    }
    // 421 = wrong password
    if (res.status === 421) {
      dispatch({ type: "WRONG_PASSWORD" });
      return;
    }
    // 422 = wrong password
    if (res.status === 422) {
      dispatch({ type: "INVALID_EMAIL" });
      return;
    }
    // 200 = ok
    if (res.status === 200) {
      const data = await res.json();
      dispatch({ type: "ON_LOGIN", payload: data });
    }
  };
};

export const signupAPI = async (user) => {
  const res = await fetch(process.env.REACT_APP_DOMAIN + "/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const messageData = await res.json();
  return {
    status: res.status,
    message: messageData.message,
  };
};
