import Head from "next/head";
import { useRouter } from "next/router";
import Input from "../Input/index";
import TextAreaInput from "../TextAreaInput/index";
import Button from "../Button/index";
import Navbar from "../Navbar/index";
import Alert from "../Alert/index";

const Auth = ({
  title,
  heading,
  redirectRoute,
  redirectName,
  redirectHighlight,
  props,
  buttonLabel,
  onSubmit,
}) => {
  const router = useRouter();

  const redirectHandel = () => {
    return redirectRoute && router.push(redirectRoute);
  };

  return (
    <div>
      <Head>
        <title>{title} | RickAndMorty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main auth-main">
        <Navbar />
        <div className="row">
          <div className="card auth-card">
            <form onSubmit={onSubmit}>
              <div className="a-top-section">
                <div className="a-heading-section">
                  <h1 className="description a-heading">
                    <span>{heading}</span>
                  </h1>
                </div>
              </div>

              <div className="a-bottom-section">
                <div className="a-input-section">
                  {props?.map((item) => {
                    return (
                      <>
                        {item.inputType === "textarea" ? (
                          <TextAreaInput
                            key={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            value={item.value}
                            onChange={item.onChange}
                            inputError={item.inputError}
                          />
                        ) : (
                          <Input
                            key={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            value={item.value}
                            onChange={item.onChange}
                            inputError={item.inputError}
                            inputType={item.inputType}
                          />
                        )}
                      </>
                    );
                  })}
                </div>

                <div className="a-button-section">
                  <Button label={buttonLabel} />
                </div>
              </div>

              {redirectName && redirectHighlight && (
                <div className="redirect-section">
                  <h1 className="redirect-text">
                    <span>
                      {redirectName}{" "}
                      <span
                        className="redirect-highlight"
                        onClick={redirectHandel}
                      >
                        {redirectHighlight}
                      </span>
                    </span>
                  </h1>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Alert />
    </div>
  );
};

export default Auth;
