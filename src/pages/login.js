import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Auth from "../components/Auth/index";
import Spinner from "../components/Spinner/index";

import { checkUser } from "../helpers/checkUser";

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: null,
    password: null,
  });

  const router = useRouter();

  useEffect(() => {
    const isActiveUser = localStorage.getItem("activeUser");

    if (isActiveUser) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const usernameValueChangeHandel = (e) => {
    return setUsernameValue(e.target.value);
  };

  const passwordValueChangeHandel = (e) => {
    return setPasswordValue(e.target.value);
  };

  const onSubmitHandel = (e) => {
    e?.preventDefault();

    const { isLoginError, invalidError } = checkUser({
      username: usernameValue,
      password: passwordValue,
      setError: setInputErrors,
    });

    if (invalidError) {
      return toast.error("Invalid login details!");
    }

    if (!inputErrors.username && !inputErrors.password && !isLoginError) {
      return router.push("/");
    }
  };

  const inputs = [
    {
      id: "input-1",
      name: "usernameValue",
      placeholder: "Username or email id",
      value: usernameValue,
      inputError: inputErrors.username,
      onChange: usernameValueChangeHandel,
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
  ];

  return (
    <Auth
      title={"Register"}
      heading={"Login"}
      redirectName={"Don't have an account?"}
      redirectHighlight={"Sign up"}
      redirectRoute={"register"}
      buttonLabel={"Login"}
      props={inputs}
      onSubmit={onSubmitHandel}
    />
  );
}
