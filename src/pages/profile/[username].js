import Head from "next/head";
import { useEffect, useState } from "react";
import Hexagon from "react-hexagon";
import dateFormat, { masks } from "dateformat";

import BottomTab from "../../components/BottomTab/index";
import Spinner from "../../components/Spinner/index";

export default function Username() {
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("activeUser");

    setUserData(JSON.parse(user));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <Head>
        <title>
          {userData ? userData?.username : "Profile"} | RickAndMorty
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main profile-main">
        <div className="row row-profile">
          <div className="profile-sec">
            <div className="user-profile">
              <Hexagon
                style={{ stroke: "#42873f" }}
                backgroundScale={1.01}
                backgroundImage="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ItwJxYh6k0jONH9gc1hf8AHaHa%26pid%3DApi&f=1"
                className="profile-image"
              />
            </div>

            <div className="info-section">
              <div className="username-section">
                <h1 className="username-text">
                  <span>@{userData?.username}</span>
                </h1>
              </div>

              <div className="email-section">
                <h1 className="email-text">
                  <span>{userData?.email}</span>
                </h1>
              </div>

              <div className="join-section">
                <h1 className="join-text">
                  <span>
                    Joined {dateFormat(userData?.createdAt, "dS mmmm yyyy")}
                  </span>
                </h1>
              </div>

              {userData?.about && (
                <div className="about-section">
                  <h1 className="about-text">
                    <span>{userData?.about}</span>
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="blank"></div>
        <BottomTab />
      </main>
    </div>
  );
}
