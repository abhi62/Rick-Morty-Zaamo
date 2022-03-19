import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import client from '../apolloConfig';
import { GET_SEARCH_CHARACTERS, GET_SEARCH_EPISODES } from '../queries';
import Characters from '../components/Characters';
import Spinner from '../components/Spinner/index';

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchSubmit, setSearchSubmit] = useState(0);
  const [checked, setChecked] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    if (searchValue?.length >= 1) {
      (async () => {
        try {
          if (checked) {
            const { data, error } = await client.query({
              query: GET_SEARCH_EPISODES,
              variables: {
                page: 1,
                filter: {
                  name: searchValue,
                },
              },
            });

            if (data) {
              setSearchData(data?.episodes);
            }
          } else {
            const { data, error } = await client.query({
              query: GET_SEARCH_CHARACTERS,
              variables: {
                page: 1,
                filter: {
                  name: searchValue,
                },
              },
            });
            if (data) {
              setSearchData(data?.characters);
            }
          }

          setIsLoading(false);
        } catch (error) {
          console.warn(error, 'error');
          setIsLoading(false);
        }
      })();
    }
  }, [searchSubmit]);

  if (isLoading) {
    return <Spinner />;
  }

  const searchSubmitHandel = (e) => {
    e?.preventDefault();

    if (searchValue?.length >= 1) {
      push(`/search?q=${searchValue}`);
    }
    return setSearchSubmit(searchSubmit + 1);
  };

  const searchValueChangeHandel = (e) => {
    return setSearchValue(e.target.value);
  };

  const checkHandel = () => {
    setSearchData([]);
    return setChecked(!checked);
  };

  return (
    <Characters
      characters={searchData}
      showSearchBar={true}
      searchValue={searchValue}
      onSearchValueChange={searchValueChangeHandel}
      onSearchSubmit={searchSubmitHandel}
      checked={checked}
      onCheckChange={checkHandel}
      showSwitchButton={true}
      hidePagination={true}
    />
  );
};

export default Search;
