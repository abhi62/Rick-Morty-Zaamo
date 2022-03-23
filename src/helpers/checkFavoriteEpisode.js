const checkFavoriteEpisode = ({ id }) => {
  const favorites = localStorage.getItem("favorites-episode");
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const isFavorites =
    favorites && [...JSON.parse(favorites)]?.length >= 1
      ? [...JSON.parse(favorites)].find((item) => {
          return (
            item.username === activeUser.username && +item.episode.id === +id
          );
        })
      : false;

  if (isFavorites) {
    return { isFavorites: true };
  } else {
    return { isFavorites: false };
  }
};

export { checkFavoriteEpisode };
