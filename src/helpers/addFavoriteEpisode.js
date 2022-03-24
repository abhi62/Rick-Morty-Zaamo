const addFavoriteEpisode = ({ id, episode }) => {
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
    const filterFavorites = [...JSON.parse(favorites)].filter((item) => {
      return (
        item.username?.toString() === activeUser.username?.toString() &&
        +item.episode.id !== +id
      );
    });

    localStorage.setItem("favorites-episode", JSON.stringify(filterFavorites));

    return { isFavorites: false };
  } else {
    if (favorites && [...JSON.parse(favorites)].length >= 1) {
      localStorage.setItem("favorites-episode", [
        JSON.stringify([
          ...JSON.parse(favorites),
          {
            episode,
            username: activeUser.username,
          },
        ]),
      ]);
    } else {
      localStorage.setItem(
        "favorites-episode",
        JSON.stringify([
          {
            episode,
            username: activeUser.username,
          },
        ])
      );
    }

    return { isFavorites: true };
  }
};

export { addFavoriteEpisode };
