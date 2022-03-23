import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { LikeIcon } from "./Icons/LikeIcon/index";
import { addFavoriteCharacter } from "../helpers/addFavoriteCharacter";
import { checkFavoriteCharacter } from "../helpers/checkFavoriteCharacter";

const Card = ({ character }) => {
  const [isFavorites, setIsFavorites] = useState(false);

  const route = useRouter();

  useEffect(() => {
    const { isFavorites: fv } = checkFavoriteCharacter({ id: +character?.id });

    setIsFavorites(fv);
  }, []);

  const favoriteClickHandel = () => {
    const { isFavorites: fv } = addFavoriteCharacter({
      id: +character?.id,
      character,
    });

    return setIsFavorites(fv);
  };

  const cardClickHandel = () => {
    return route.push(`/character/${+character?.id}`);
  };

  return (
    <div className="card">
      {character?.image && (
        <Image
          src={character.image}
          width={300}
          height={300}
          className="image"
          alt="character"
          onClick={cardClickHandel}
        />
      )}

      <div className="description" onClick={cardClickHandel}>
        <p className="name">{character?.name}</p>
        <p className="status">
          {character?.status} - {character?.species}
        </p>
        <p className="location">{character?.location?.name}</p>
      </div>
      <div className="fv-icon" onClick={favoriteClickHandel}>
        <LikeIcon active={isFavorites} />
      </div>
    </div>
  );
};

export default Card;
