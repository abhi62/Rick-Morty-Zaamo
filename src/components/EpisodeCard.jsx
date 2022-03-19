import { useRouter } from "next/router";

const EpisodeCard = ({ episode }) => {
  const route = useRouter();

  const cardClickHandel = () => {
    return route.push(`/episode/${+episode.id}`);
  };

  return (
    <div className="card episode-card" onClick={cardClickHandel}>
      <div className="description">
        <p className="name">{episode?.name}</p>
        <p className="status">{episode?.air_date}</p>
        <p className="location">{episode?.episode}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
