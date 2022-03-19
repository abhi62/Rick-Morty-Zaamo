import { useEffect, useState } from "react";
import client from "../apolloConfig";
import { useRouter } from "next/router";

import { GET_ALL_CHARACTERS } from "../queries";
import Characters from "../components/Characters";
import Spinner from "../components/Spinner/index";

export default function Home({ characters }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const isActiveUser = localStorage.getItem("activeUser");

    if (!isActiveUser) {
      router.push("login");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <Characters characters={characters} />;
}

export const getStaticProps = async () => {
  const { data } = await client.query({ query: GET_ALL_CHARACTERS });

  return {
    props: {
      characters: data?.characters,
    },
  };
};
