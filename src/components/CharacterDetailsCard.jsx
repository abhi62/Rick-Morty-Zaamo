import Image from "next/image";
import { useRouter } from "next/router";

import { LikeIcon } from "./Icons/LikeIcon/index";

import { AddFavorite } from "../helpers/addFavorite";
import { useEffect, useState } from "react";

import { CheckFavorite } from "../helpers/checkFavorite";

const CharacterDetailsCard = ({ character }) => {
  const [isFavorites, setIsFavorites] = useState(false);

  const route = useRouter();

  useEffect(() => {
    const { isFavorites: fv } = CheckFavorite({ id: +character?.id });

    setIsFavorites(fv);
  }, []);

  const favoriteClickHandel = () => {
    const { isFavorites: fv } = AddFavorite({ id: +character?.id, character });

    return setIsFavorites(fv);
  };

  const cardClickHandel = () => {
    return route.push(`/character/${+character?.id}`);
  };

  return (
    <div className="card character-details-card">
      <Image
        src={character.image}
        width={300}
        height={300}
        className="image"
        alt="character"
        onClick={cardClickHandel}
      />
      <div className="description">
        <p className="name">{character?.name}</p>
        <p className="status">
          {character?.status} - {character?.species} - {character?.gender}
        </p>
      </div>

      <div className="description">
        <p className="name name-bold">Origin</p>
        <p className="name">{character?.origin?.name}</p>
        <p className="status">
          {character?.origin?.type} - {character?.origin?.dimension}
        </p>
        <p className="location">{character?.origin?.name}</p>
      </div>

      <div className="description">
        <p className="name name-bold">Location</p>
        <p className="name">{character?.location?.name}</p>
        <p className="status">
          {character?.location?.type} - {character?.location?.dimension}
        </p>
      </div>

      <div className="fv-icon" onClick={favoriteClickHandel}>
        <LikeIcon active={isFavorites} />
      </div>
    </div>
  );
};

export default CharacterDetailsCard;
