import Link from 'next/link';
import SearchInput from '../SearchInput/index';

const Navbar = ({
  showSearchBar,
  searchValue,
  onSearchValueChange,
  onSearchSubmit,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {showSearchBar ? (
        <SearchInput
          value={searchValue}
          onChange={onSearchValueChange}
          onSearchSubmit={onSearchSubmit}
        />
      ) : (
        <div className='nav'>
          <div className='title'>
            <Link href={'/'}>
              <span className='logo'>Rick And Morty - Zaamo</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
