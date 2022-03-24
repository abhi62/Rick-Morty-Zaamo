const checkAbout = ({ about, setError }) => {
  const aboutLength = +about?.length;

  if (aboutLength && aboutLength <= 9) {
    setError((preValue) => {
      return {
        ...preValue,
        about: "About must be contain 10 character",
      };
    });

    return { isAboutError: true };
  } else {
    setError((preValue) => {
      return {
        ...preValue,
        about: null,
      };
    });

    return { isAboutError: false };
  }
};

export { checkAbout };
