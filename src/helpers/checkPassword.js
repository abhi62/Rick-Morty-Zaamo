const checkPassword = ({ password, setError }) => {
  const expression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const isValidPassword = expression.test(`${password}`);

  if (!isValidPassword) {
    setError((preValue) => {
      return {
        ...preValue,
        password: "Please enter valid password",
      };
    });
    return { isPasswordError: true };
  } else {
    setError((preValue) => {
      return {
        ...preValue,
        password: null,
      };
    });

    return { isPasswordError: false };
  }
};

export { checkPassword };
