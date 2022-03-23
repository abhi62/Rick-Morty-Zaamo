import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import client from "../apolloConfig";
import { GET_SEARCH_CHARACTERS, GET_SEARCH_EPISODES } from "../queries";
import Characters from "../components/Characters";
import Spinner from "../components/Spinner/index";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [reachEnd, setReachEnd] = useState(false);

  const [value] = useDebounce(searchValue, 500);

  const { push } = useRouter();

  useEffect(() => {
    if (searchData?.length <= 0) {
      setIsLoading(true);
    }

    (async () => {
      try {
        if (value?.trim()?.length >= 1) {
          if (checked) {
            const { data } = await client.query({
              query: GET_SEARCH_EPISODES,
              variables: {
                page,
                filter: {
                  name: value,
                },
              },
            });

            if (data) {
              if (searchData?.length >= 1) {
                setSearchData((preValue) => {
                  return [...preValue, ...data.episodes.results];
                });
              } else {
                setSearchData(() => {
                  return [...data.episodes.results];
                });
              }
            }
          } else {
            const { data } = await client.query({
              query: GET_SEARCH_CHARACTERS,
              variables: {
                page,
                filter: {
                  name: value,
                },
              },
            });
            if (data) {
              if (searchData?.length >= 1) {
                setSearchData((preValue) => {
                  return [...preValue, ...data.characters.results];
                });
              } else {
                setSearchData(() => {
                  return [...data.characters.results];
                });
              }
            }
          }
        }

        setIsLoading(false);
      } catch (error) {
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

  useEffect(() => {
    if (searchData?.length <= 0) {
      setIsLoading(true);
    }

    (async () => {
      try {
        if (value?.trim()?.length >= 1) {
          if (checked) {
            const { data } = await client.query({
              query: GET_SEARCH_EPISODES,
              variables: {
                page,
                filter: {
                  name: value,
                },
              },
            });

            if (data) {
              setSearchData(() => {
                return [...data.episodes.results];
              });
            }
          } else {
            const { data } = await client.query({
              query: GET_SEARCH_CHARACTERS,
              variables: {
                page,
                filter: {
                  name: value,
                },
              },
            });

            if (data) {
              setSearchData((preValue) => {
                return [...data.characters.results];
              });
            }
          }
        }

        setIsLoading(false);
      } catch (error) {
        if (error?.message?.toString() === "404: Not Found") {
          setReachEnd(true);
        } else {
          toast.error("Something went wrong!");
        }

        setIsLoading(false);
      }
    })();
    setIsLoading(false);
  }, [value]);

  if (isLoading) {
    return <Spinner />;
  }

  const searchSubmitHandel = (e) => {
    e?.preventDefault();

    if (searchValue?.length >= 1) {
      setSearchData(null);
      return push(`/search?q=${searchValue}`);
    }
  };

  const searchValueChangeHandel = (e) => {
    return setSearchValue(e.target.value);
  };

  const fetchMoreHandel = () => {
    return setPage(++page);
  };

  const checkHandel = () => {
    setSearchData(null);
    setPage(1);
    setReachEnd(false);
    setChecked(!checked);
  };

  return (
    <Characters
      data={
        searchValue.length >= 1 && !searchData
          ? []
          : searchData
          ? searchData
          : null
      }
      showSearchBar={true}
      searchValue={value}
      onSearchValueChange={searchValueChangeHandel}
      onSearchSubmit={searchSubmitHandel}
      checked={checked}
      onCheckChange={checkHandel}
      showSwitchButton={true}
      hidePagination={true}
      loadMore={fetchMoreHandel}
      reachEnd={reachEnd}
    />
  );
};

export default Search;
