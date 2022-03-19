const SearchInput = ({ searchValue, onChange, onSearchSubmit }) => {
  return (
    <div className="search-b">
      <form onSubmit={onSearchSubmit} className="search-input-section">
        <input
          placeholder="Search"
          name="searchValue"
          value={searchValue}
          onChange={onChange}
          className="search-input"
        />
      </form>
    </div>
  );
};

export default SearchInput;
