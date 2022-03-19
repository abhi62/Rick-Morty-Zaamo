import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import Auth from "../components/Auth/index";

import { checkEmail } from "../helpers/checkEmail";
import { checkPassword } from "../helpers/checkPassword";
import { createUsername } from "../helpers/createUsername";

export default function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [inputErrors, setInputErrors] = useState({
    email: null,
    password: null,
  });

  const router = useRouter();

  const emailValueChangeHandel = (e) => {
    return setEmailValue(e.target.value);
  };

  const passwordValueChangeHandel = (e) => {
    return setPasswordValue(e.target.value);
  };

  const onSubmitHandel = (e) => {
    e?.preventDefault();

    const { isEmailError } = checkEmail({
      email: emailValue,
      setError: setInputErrors,
    });

    const { isPasswordError } = checkPassword({
      password: passwordValue,
      setError: setInputErrors,
    });

    if (
      !inputErrors.email &&
      !inputErrors.password &&
      !isEmailError &&
      !isPasswordError
    ) {
      const { username } = createUsername();
      const accounts = localStorage.getItem("accounts");

      if (accounts && [...JSON.parse(accounts)].length >= 1) {
        localStorage.setItem(
          "accounts",
          JSON.stringify([
            ...JSON.parse(accounts),
            {
              id: nanoid(),
              username: username,
              email: emailValue,
              password: passwordValue,
            },
          ])
        );

        return router.push("login");
      } else {
        localStorage.setItem(
          "accounts",
          JSON.stringify([
            {
              id: nanoid(),
              username: username,
              email: emailValue,
              password: passwordValue,
            },
          ])
        );

        return router.push("login");
      }
    }
  };

  const inputs = [
    {
      id: "input-1",
      name: "emailValue",
      placeholder: "Email id",
      value: emailValue,
      inputError: inputErrors.email,
      onChange: emailValueChangeHandel,
    },
    {
      id: "input-2",
      name: "passwordValue",
      placeholder: "Password",
      value: passwordValue,
      inputError: inputErrors.password,
      onChange: passwordValueChangeHandel,
    },
  ];

  return (
    <Auth
      title={"Register"}
      heading={"Create Account"}
      redirectName={"Already have an account?"}
      redirectHighlight={"Login"}
      redirectRoute={"login"}
      props={inputs}
      buttonLabel={"Create Account"}
      onSubmit={onSubmitHandel}
    />
  );
}
