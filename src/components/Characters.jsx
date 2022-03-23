import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { WindmillSpinner } from "react-spinner-overlay";
import ScrollToTop from "react-scroll-up";
import Card from "./Card";
import EpisodeCard from "./EpisodeCard";
import SwitchButton from "./SwitchButton/index";
import Alert from "./Alert/index";
import Navbar from "./Navbar/index";
import BottomTab from "./BottomTab/index";
import { UpIcon } from "./Icons/UpIcon/index";

const Characters = ({
  data,
  showSearchBar,
  searchValue,
  onSearchValueChange,
  onSearchSubmit,
  checked,
  onCheckChange,
  showSwitchButton,
  loadMore,
  reachEnd,
}) => {
  return (
    <div>
      <Head>
        <title>Home | RickAndMorty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Navbar
          showSearchBar={showSearchBar}
          searchValue={searchValue}
          onSearchValueChange={onSearchValueChange}
          onSearchSubmit={onSearchSubmit}
        />

        {showSwitchButton && (
          <SwitchButton checked={checked} onCheckChange={onCheckChange} />
        )}

        {data && (
          <InfiniteScroll
            className="row"
            dataLength={data.length}
            next={loadMore}
            hasMore={true}
            loader={
              <div
                className={`loading-sec ${
                  data.length <= 0 && "loading-sec-center"
                }`}
              >
                {!reachEnd && (
                  <WindmillSpinner
                    overlayColor="#000000"
                    color="#3d71d1"
                    size={50}
                    borderWidth={10}
                  />
                )}
              </div>
            }
          >
            {checked
              ? data?.map((item) => (
                  <EpisodeCard episode={item} key={item.id} />
                ))
              : data?.map((item) => <Card character={item} key={item.id} />)}
          </InfiniteScroll>
        )}

        {reachEnd && (
          <div className="no-more-result-sec">
            <h1 className="no-more-result-text">
              <span>
                You have seen it all {checked ? "episodes" : "characters"}
              </span>
            </h1>
          </div>
        )}

        <BottomTab />

        <ScrollToTop showUnder={160}>
          <UpIcon />
        </ScrollToTop>
      </main>
      <Alert />

      <div className="blank"></div>
    </div>
  );
};

export default Characters;
