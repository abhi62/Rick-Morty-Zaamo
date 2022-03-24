import { useEffect } from "react";
import client from "../apolloConfig";
import { toast } from "react-toastify";
import { GET_ALL_CHARACTERS, GET_PAGE_INFO } from "../queries";
import Characters from "../components/Characters";

const Page = ({ characters, err }) => {
  useEffect(() => {
    if (err) {
      toast.error("Something went wrong!");
    }
  }, [err]);

  return <Characters characters={characters} />;
};

export const getStaticPaths = async () => {
  const { data } = await client.query({ query: GET_PAGE_INFO });

  const numberOfPages = data?.characters.info.pages + 1;

  const arrayOfPages = [...Array(numberOfPages).keys()];

  const paths = arrayOfPages.map((page) => ({
    params: { page: `${page}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { page } }) => {
  const { data, error } = await client.query({
    query: GET_ALL_CHARACTERS,
    variables: { page: Number(page) },
  });

  return {
    props: {
      characters: data?.characters,
      err: error ? error : null,
    },
  };
};

export default Page;
