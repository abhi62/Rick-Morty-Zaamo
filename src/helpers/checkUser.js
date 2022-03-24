const checkUser = ({ username, password, setError }) => {
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  const isEmail = expression.test(`${username}`);

  const accounts = localStorage.getItem("accounts");

  const isAccount =
    accounts && [...JSON.parse(accounts)]?.length >= 1
      ? [...JSON.parse(accounts)].find((item) => {
          return isEmail
            ? item.email === username && item.password === password
            : item.username === username && item.password === password;
        })
      : false;

  const isValidUsername = username?.trim() === "";
  const isValidPassword = password?.trim() === "";

  if (isValidUsername) {
    setError((preValue) => {
      return {
        ...preValue,
        username: "Username must not be empty",
      };
    });
  } else {
    setError((preValue) => {
      return {
        ...preValue,
        username: null,
      };
    });
  }

  if (isValidPassword) {
    setError((preValue) => {
      return {
        ...preValue,
        password: "Password must not be empty",
      };
    });
  } else {
    setError((preValue) => {
      return {
        ...preValue,
        password: null,
      };
    });
  }

  if (!isValidUsername && !isValidPassword && !isAccount) {
    return { isLoginError: true, invalidError: true };
  } else {
    if (!isValidPassword && !isValidUsername) {
      localStorage.setItem("activeUser", JSON.stringify(isAccount));

      return { isLoginError: false };
    }

    return { isLoginError: false };
  }
};

export { checkUser };
