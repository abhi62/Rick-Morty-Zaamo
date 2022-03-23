import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LikeIcon } from "./Icons/LikeIcon/index";
import { addFavoriteEpisode } from "../helpers/addFavoriteEpisode";
import { checkFavoriteEpisode } from "../helpers/checkFavoriteEpisode";

const EpisodeCard = ({ episode }) => {
  const [isFavorites, setIsFavorites] = useState(false);

  const route = useRouter();

  useEffect(() => {
    const { isFavorites: fv } = checkFavoriteEpisode({ id: +episode?.id });

    setIsFavorites(fv);
  }, []);

  const favoriteClickHandel = () => {
    const { isFavorites: fv } = addFavoriteEpisode({
      id: +episode?.id,
      episode,
    });

    return setIsFavorites(fv);
  };

  const cardClickHandel = () => {
    return route.push(`/episode/${+episode.id}`);
  };

  return (
    <div className="card episode-card">
      <div className="description" onClick={cardClickHandel}>
        <p className="name">{episode?.name}</p>
        <p className="status">{episode?.air_date}</p>
        <p className="location">{episode?.episode}</p>
      </div>

      <div className="fv-icon" onClick={favoriteClickHandel}>
        <LikeIcon active={isFavorites} />
      </div>
    </div>
  );
};

export default EpisodeCard;
