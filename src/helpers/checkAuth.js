const checkAuth = ({ router }) => {
  const auth = localStorage.getItem("activeUser");

  if (!auth) {
    return router.push("/login");
  }

  return { isAuth: true };
};

export { checkAuth };
