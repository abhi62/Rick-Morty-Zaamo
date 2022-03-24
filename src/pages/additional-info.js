import { useState } from "react";
import { useRouter } from "next/router";
import Auth from "../components/Auth/index";
import { checkAbout } from "../helpers/checkAbout";

export default function AdditionalInfo() {
  const [aboutValue, setAboutValue] = useState("");

  const [inputErrors, setInputErrors] = useState({
    about: null,
  });

  const router = useRouter();

  const aboutValueChangeHandel = (e) => {
    return setAboutValue(e.target.value);
  };

  const onSubmitHandel = (e) => {
    e?.preventDefault();

    const { isAboutError } = checkAbout({
      about: aboutValue,
      setError: setInputErrors,
    });

    if (!inputErrors.about && !isAboutError) {
      const accounts = localStorage.getItem("accounts");
      const activeUser = localStorage.getItem("activeUser");

      if (accounts && [JSON.parse(accounts)]?.length >= 1) {
        const user = JSON.parse(activeUser);

        const account = [...JSON.parse(accounts)].filter((item) => {
          return +item.id !== +user.id;
        });

        const update_user = {
          ...user,
          about: aboutValue,
        };

        localStorage.setItem("activeUser", JSON.stringify(update_user));

        localStorage.setItem("accounts", [
          JSON.stringify([...account, update_user]),
        ]);

        return router.push("/");
      }
    }
  };

  const inputs = [
    {
      id: "input-1",
      name: "aboutValue",
      placeholder: "About your self",
      value: aboutValue,
      inputError: inputErrors.about,
      onChange: aboutValueChangeHandel,
      inputType: "textarea",
    },
  ];

  return (
    <Auth
      title={"Additional Info"}
      heading={"About"}
      redirectName={null}
      redirectHighlight={null}
      redirectRoute={null}
      props={inputs}
      buttonLabel={"Continue"}
      onSubmit={onSubmitHandel}
    />
  );
}
