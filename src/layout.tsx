import {
  BirdhouseIcon,
  HashIcon,
  MessageCircleIcon,
  UserIcon,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { AuthActions } from "./components/AuthActions";
import { type MainNavItem, MainNav } from "./components/MainNav";
import icon from "./assets/icon.svg";
import { token } from "./api/client";

const mainNavItems: MainNavItem[] = [
  { key: "home", label: "首页", to: "/home", icon: BirdhouseIcon },
  { key: "topics", label: "话题", to: "/topics", icon: HashIcon },
  { key: "messages", label: "消息", to: "/messages", icon: MessageCircleIcon },
  { key: "profile", label: "我的", to: "/profile", icon: UserIcon },
];

const mainNavItemsWithoutAuth: MainNavItem[] = [
  { key: "home", label: "首页", to: "/home", icon: BirdhouseIcon },
  { key: "topics", label: "话题", to: "/topics", icon: HashIcon },
];

export function AppLayout() {
  const isAuthenticated = !!token.get();
  const navItems = isAuthenticated ? mainNavItems : mainNavItemsWithoutAuth;

  const handleLogout = () => {
    token.clear();
    window.location.reload();
  };

  return (
    <div className="overflow-y-auto h-screen px-4 py-4">
      <div className="mx-auto max-w-7xl flex gap-8 items-start">
        <aside className="w-64 shrink-0 sticky top-0 h-[calc(100vh-2rem)] flex flex-col">
          <img src={icon} className="h-16 w-16" />
          <MainNav items={navItems} ariaLabel="MainNav" />
          <div className="mt-auto">
            <AuthActions
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            />
          </div>
        </aside>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
