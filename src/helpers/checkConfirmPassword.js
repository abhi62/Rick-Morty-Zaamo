const checkConfirmPassword = ({ password, confirmPassword, setError }) => {
  const isValidPassword = password === confirmPassword;

  if (!isValidPassword) {
    setError((preValue) => {
      return {
        ...preValue,
        confirmPassword: "Confirm password did not match with password",
      };
    });

    return { isConfirmPasswordError: true };
  } else {
    setError((preValue) => {
      return {
        ...preValue,
        confirmPassword: null,
      };
    });

    return { isConfirmPasswordError: false };
  }
};

export { checkConfirmPassword };
