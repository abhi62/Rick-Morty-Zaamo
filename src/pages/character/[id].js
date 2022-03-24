import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import client from "../../apolloConfig";
import { GET_SINGLE_CHARACTERS } from "../../queries";
import Spinner from "../../components/Spinner/index";
import Navbar from "../../components/Navbar/index";
import CharacterDetailsCard from "../../components/CharacterDetailsCard";
import EpisodeCardCard from "../../components/EpisodeCard";
import BottomTab from "../../components/BottomTab/index";
import Alert from "../../components/Alert/index";
import ScrollToTop from "react-scroll-up";
import { UpIcon } from "../../components/Icons/UpIcon/index";

const Character = ({ character }) => {
  const [characterData, setCharacterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { query } = useRouter();

  useEffect(() => {
    const id = +query.id;

    if (id) {
      (async () => {
        try {
          const { data } = await client.query({
            query: GET_SINGLE_CHARACTERS,
            variables: {
              id,
            },
          });

          if (data) {
            setCharacterData(data.character);
            setIsLoading(false);
          }
        } catch (error) {
          toast.error("Something went wrong!");
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
          {characterData && (
            <div className="cr-cards-section">
              <CharacterDetailsCard character={characterData} />

              <div className="ep-heading-sec">
                <h1 className="ep-heading">
                  <span>Episodes</span>
                </h1>
              </div>

              <div className="ep-cards">
                {characterData?.episode?.map((item) => {
                  return <EpisodeCardCard key={item.id} episode={item} />;
                })}
              </div>
            </div>
          )}
        </div>
        <BottomTab />
        <div className="blank"></div>
        <ScrollToTop showUnder={160}>
          <div className="slide-to-top">
            <UpIcon />
          </div>
        </ScrollToTop>
      </main>
      <Alert />
    </div>
  );
};

export default Character;
