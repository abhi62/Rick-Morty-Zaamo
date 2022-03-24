import Head from "next/head";
import { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-up";
import Spinner from "../components/Spinner/index";
import Navbar from "../components/Navbar/index";
import BottomTab from "../components/BottomTab/index";
import SwitchButton from "../components/SwitchButton/index";

import Card from "../components/Card";
import EpisodeCard from "../components/EpisodeCard";

import { UpIcon } from "../components/Icons/UpIcon/index";

export default function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesData, setFavoritesData] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      const data = localStorage.getItem("favorites-episode");

      const activeUser = JSON.parse(localStorage.getItem("activeUser"));

      const favoriteData =
        data &&
        [...JSON.parse(data)]?.filter((item) => {
          return item.username?.toString() === activeUser.username?.toString();
        });

      data && setFavoritesData(favoriteData);
    } else {
      const data = localStorage.getItem("favorites-character");

      const activeUser = JSON.parse(localStorage.getItem("activeUser"));

      const favoriteData =
        data &&
        [...JSON.parse(data)]?.filter((item) => {
          return item.username?.toString() === activeUser.username?.toString();
        });

      data && setFavoritesData(favoriteData);
    }

    setIsLoading(false);
  }, [checked]);

  if (isLoading) {
    return <Spinner />;
  }

  const checkHandel = () => {
    setFavoritesData([]);
    return setChecked(!checked);
  };

  const favoritesDataLength = favoritesData.length;

  return (
    <div>
      <Head>
        <title>Favorites | RickAndMorty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Navbar />

        <SwitchButton checked={checked} onCheckChange={checkHandel} />

        <div className="count-heading-fv">
          <h1 className="count-heading-text-fv">
            <span>
              {favoritesDataLength} Favorite {checked ? "Episode" : "Character"}
              {favoritesDataLength >= 2 ? "s" : ""}
            </span>
          </h1>
        </div>

        <div className="row">
          {checked
            ? favoritesData?.map((item) => (
                <EpisodeCard episode={item?.episode} key={item.id} />
              ))
            : favoritesData?.map((item) => (
                <Card character={item?.character} key={item.id} />
              ))}
        </div>

        <ScrollToTop showUnder={160}>
          <div className="slide-to-top">
            <UpIcon />
          </div>
        </ScrollToTop>

        <BottomTab />
      </main>
    </div>
  );
}
