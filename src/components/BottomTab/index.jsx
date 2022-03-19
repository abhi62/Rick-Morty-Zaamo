import { useRouter } from "next/router";

import { BackIcon } from "../Icons/BackIcon/index";
import { HomeIcon } from "../Icons/HomeIcon/index";
import { LogoutIcon } from "../Icons/LogoutIcon/index";
import { UserIcon } from "../Icons/UserIcon/index";
import { SearchIcon } from "../Icons/SearchIcon/index";
import { FavoriteIcon } from "../Icons/FavoriteIcon/index";

const BottomTab = () => {
  const { pathname, push, back } = useRouter();

  const logoutHandel = () => {
    localStorage.removeItem("activeUser");
    return push("/login");
  };

  const items = [
    {
      id: "item-1",
      name: "back",
      icon: <BackIcon />,
      onClick: () => {
        return back();
      },
    },
    {
      id: "item-2",
      name: "home",
      icon: <HomeIcon active={pathname === "/"} />,
      onClick: () => {
        return push("/");
      },
    },
    {
      id: "item-3",
      name: "search",
      icon: <SearchIcon active={pathname.includes("search")} />,
      onClick: () => {
        return push("/search");
      },
    },
    {
      id: "item-4",

      name: "profile",
      icon: <UserIcon active={pathname.includes("profile")} />,
      onClick: () => {
        return push("/profile/hello");
      },
    },
    {
      id: "item-5",
      name: "favorites",
      icon: <FavoriteIcon active={pathname.includes("favorites")} />,
      onClick: () => {
        return push("/favorites");
      },
    },
    {
      id: "item-6",
      name: "logout",
      icon: <LogoutIcon />,
      onClick: logoutHandel,
    },
  ];

  return (
    <div className="bottom-nav">
      <div className="bn-item-section">
        {items.map((item) => {
          return (
            <div key={item.id} className="bn-item" onClick={item.onClick}>
              <div className={`bt-${item.name}`}>{item.icon}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTab;
