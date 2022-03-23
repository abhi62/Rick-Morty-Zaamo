const checkAuth = ({ router }) => {
  const auth = localStorage.getItem("activeUser");

  if (!auth) {
    return router.push("/login");
  }

  const about = JSON.parse(auth)?.about;

  if (!about) {
    return router.push("/additional-info");
  }

  return { isAuth: true };
};

export { checkAuth };
