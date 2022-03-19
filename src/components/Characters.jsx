import Head from 'next/head';
import Card from './Card';
import EpisodeCard from './EpisodeCard';
import Switch from 'react-switch';
import { useRouter } from 'next/router';

import Navbar from './Navbar/index';
import BottomTab from './BottomTab/index';
import Link from 'next/link';

const Characters = ({
  characters,
  showSearchBar,
  searchValue,
  onSearchValueChange,
  onSearchSubmit,
  checked,
  onCheckChange,
  showSwitchButton,
  hidePagination,
}) => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;

  return (
    <div>
      <Head>
        <title>Home | RickAndMorty</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <Navbar
          showSearchBar={showSearchBar}
          searchValue={searchValue}
          onSearchValueChange={onSearchValueChange}
          onSearchSubmit={onSearchSubmit}
        />

        {showSwitchButton && (
          <div className='check-button-sec'>
            <div className='check-btn-s'>
              <div className='heading-cb-sec'>
                <h1 className='heading-cb'>
                  <span>Characters</span>
                </h1>
              </div>

              <div className='switch-btn-sec'>
                <Switch checked={checked} onChange={onCheckChange} />
              </div>

              <div className='heading-cb-sec'>
                <h1 className='heading-cb'>
                  <span>Episodes</span>
                </h1>
              </div>
            </div>
          </div>
        )}

        <div className='row'>
          {checked
            ? characters?.results?.map((item) => (
                <EpisodeCard episode={item} key={item.id} />
              ))
            : characters?.results?.map((item) => (
                <Card character={item} key={item.id} />
              ))}
        </div>

        <BottomTab />
      </main>
      {!hidePagination && characters?.results && (
        <footer className='next-footer'>
          {page > 1 && (
            <Link href={`/${page - 1}`} passHref>
              <button>Previous Page</button>
            </Link>
          )}

          <Link href={`/${page + 1}`} passHref>
            <button>Next Page</button>
          </Link>
        </footer>
      )}

      <div className='blank'></div>
    </div>
  );
};

export default Characters;
