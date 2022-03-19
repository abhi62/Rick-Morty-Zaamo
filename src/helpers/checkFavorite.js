import { nanoid } from "nanoid";

const CheckFavorite = ({ id }) => {
  const favorites = localStorage.getItem("favorites");
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
    return { isFavorites: true };
  } else {
    return { isFavorites: false };
  }
};

export { CheckFavorite };
