import Head from "next/head";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner/index";
import Navbar from "../components/Navbar/index";
import BottomTab from "../components/BottomTab/index";

import Card from "../components/Card";

export default function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");

    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    const favoriteData =
      data &&
      [...JSON.parse(data)]?.filter((item) => {
        return item.username?.toString() === activeUser.username?.toString();
      });

    data && setCharactersData(favoriteData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Head>
        <title>Favorites | RickAndMorty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Navbar />
        <div className="row">
          {charactersData?.map((item) => (
            <Card key={item?.id} character={item?.character} />
          ))}
        </div>
        <BottomTab />
      </main>
    </div>
  );
}
