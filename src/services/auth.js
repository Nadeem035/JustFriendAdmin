export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const authenticate = (res, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("UserName", JSON.stringify(res.data.name));
    localStorage.setItem("jwt", JSON.stringify(res.token));
    next();
  }
};
