import "../../styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

import { checkAuth } from "../helpers/checkAuth";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const {} = checkAuth({ router });
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
