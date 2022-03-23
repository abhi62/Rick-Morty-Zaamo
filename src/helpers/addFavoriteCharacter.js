const addFavoriteCharacter = ({ id, character }) => {
  const favorites = localStorage.getItem("favorites-character");
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const isFavorites =
    favorites && [...JSON.parse(favorites)]?.length >= 1
      ? [...JSON.parse(favorites)].find((item) => {
          return (
            item.username === activeUser.username && +item.character.id === +id
          );
        })
      : false;

  if (isFavorites) {
    const filterFavorites = [...JSON.parse(favorites)].filter((item) => {
      return (
        item.username?.toString() === activeUser.username?.toString() &&
        +item.character.id !== +id
      );
    });

    localStorage.setItem(
      "favorites-character",
      JSON.stringify(filterFavorites)
    );

    return { isFavorites: false };
  } else {
    if (favorites && [...JSON.parse(favorites)].length >= 1) {
      localStorage.setItem("favorites-character", [
        JSON.stringify([
          ...JSON.parse(favorites),
          {
            character,
            username: activeUser.username,
          },
        ]),
      ]);
    } else {
      localStorage.setItem(
        "favorites-character",
        JSON.stringify([
          {
            character,
            username: activeUser.username,
          },
        ])
      );
    }

    return { isFavorites: true };
  }
};

export { addFavoriteCharacter };
