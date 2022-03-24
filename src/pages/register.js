import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import Auth from "../components/Auth/index";
import { checkEmail } from "../helpers/checkEmail";
import { checkPassword } from "../helpers/checkPassword";
import { createUsername } from "../helpers/createUsername";
import { checkConfirmPassword } from "../helpers/checkConfirmPassword";

export default function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [inputErrors, setInputErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const router = useRouter();

  const emailValueChangeHandel = (e) => {
    return setEmailValue(e.target.value);
  };

  const passwordValueChangeHandel = (e) => {
    return setPasswordValue(e.target.value);
  };

  const confirmPasswordValueChangeHandel = (e) => {
    return setConfirmPasswordValue(e.target.value);
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

    const { isConfirmPasswordError } = checkConfirmPassword({
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
      setError: setInputErrors,
    });

    if (
      !inputErrors.email &&
      !inputErrors.password &&
      !isEmailError &&
      !isPasswordError &&
      !isConfirmPasswordError
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
              about: null,
              createdAt: new Date().toISOString(),
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
              about: null,
              createdAt: new Date().toISOString(),
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
      inputType: "text",
    },
    {
      id: "input-2",
      name: "passwordValue",
      placeholder: "Password",
      value: passwordValue,
      inputError: inputErrors.password,
      onChange: passwordValueChangeHandel,
      inputType: "password",
    },
    {
      id: "input-3",
      name: "confirmPasswordValue",
      placeholder: "Confirm password",
      value: confirmPasswordValue,
      inputError: inputErrors.confirmPassword,
      onChange: confirmPasswordValueChangeHandel,
      inputType: "password",
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
