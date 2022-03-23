import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import client from "../apolloConfig";
import { toast } from "react-toastify";
import { GET_ALL_CHARACTERS, GET_ALL_EPISODES } from "../queries";
import Characters from "../components/Characters";
import Spinner from "../components/Spinner/index";
import { checkAuth } from "../helpers/checkAuth";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [itemsData, setItemsData] = useState(null);
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [reachEnd, setReachEnd] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const {} = checkAuth({ router });
  }, []);

  useEffect(() => {
    if (itemsData?.length <= 0) {
      setIsLoading(true);
    }

    (async () => {
      try {
        if (checked) {
          // get episodes
          const { data } = await client.query({
            query: GET_ALL_EPISODES,
            variables: {
              page,
            },
          });

          if (data) {
            if (itemsData?.length >= 1) {
              setItemsData((preValue) => {
                return [...preValue, ...data.episodes.results];
              });
            } else {
              setItemsData(() => {
                return [...data.episodes.results];
              });
            }
          }
        } else {
          // get characters
          const { data } = await client.query({
            query: GET_ALL_CHARACTERS,
            variables: {
              page,
            },
          });

          if (data) {
            if (itemsData?.length >= 1) {
              setItemsData((preValue) => {
                return [...preValue, ...data.characters.results];
              });
            } else {
              setItemsData(() => {
                return [...data.characters.results];
              });
            }
          }
        }
      } catch (error) {
        console.log(error?.message, typeof error?.message);
        if (error?.message?.toString() === "404: Not Found") {
          setReachEnd(true);
        } else {
          toast.error("Something went wrong!");
        }
        setIsLoading(false);
      }
    })();

    setIsLoading(false);
  }, [page, checked]);

  if (isLoading) {
    return <Spinner />;
  }

  const fetchMoreHandel = () => {
    return setPage(++page);
  };

  const checkHandel = () => {
    setItemsData([]);
    setPage(1);
    return setChecked(!checked);
  };

  return (
    <Characters
      data={itemsData ?? []}
      checked={checked}
      loadMore={fetchMoreHandel}
      showSwitchButton={true}
      onCheckChange={checkHandel}
      reachEnd={reachEnd}
    />
  );
}
