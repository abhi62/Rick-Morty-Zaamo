import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import client from "../../apolloConfig";
import { GET_SINGLE_EPISODE } from "../../queries";
import Spinner from "../../components/Spinner/index";
import Navbar from "../../components/Navbar/index";
import EpisodeCard from "../../components/EpisodeCard";
import Card from "../../components/Card";
import BottomTab from "../../components/BottomTab/index";

const Episode = () => {
  const [episodeData, setEpisodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { query } = useRouter();

  useEffect(() => {
    const id = +query.id;

    if (id) {
      (async () => {
        try {
          const { data, error } = await client.query({
            query: GET_SINGLE_EPISODE,
            variables: {
              id,
            },
          });

          if (data) {
            setEpisodeData(data.episode);
          }
          setIsLoading(false);
        } catch (error) {
          console.warn(error, "error");
          setIsLoading(false);
        }
      })();
    }
  }, [query]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Head>
        <title>Character | RickAndMorty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main character-main">
        <Navbar />
        <div className="row character-row">
          {episodeData && (
            <div className="cr-cards-section">
              <EpisodeCard episode={episodeData} />

              <div className="ep-heading-sec">
                <h1 className="ep-heading">
                  <span>Characters</span>
                </h1>
              </div>

              <div className="ep-cards">
                {episodeData?.characters?.map((item) => {
                  return <Card key={item.id} character={item} />;
                })}
              </div>
            </div>
          )}
        </div>
        <BottomTab />
        <div className="blank"></div>
      </main>
    </div>
  );
};

export default Episode;