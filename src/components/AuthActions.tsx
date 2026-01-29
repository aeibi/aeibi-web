import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

type AuthActionsProps = {
  isAuthenticated: boolean;
  onLogout?: () => void;
  loginTo?: string;
  registerTo?: string;
};

export function AuthActions({
  isAuthenticated,
  onLogout,
  loginTo = "/login",
  registerTo = "/register",
}: AuthActionsProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex gap-2">
        <Link
          to={loginTo}
          className="flex-1 flex items-center justify-center p-3 text-primary rounded-lg transition-colors hover:bg-primary/10"
        >
          <div>登录</div>
        </Link>
        <Link
          to={registerTo}
          className="flex-1 flex items-center justify-center p-3 text-muted rounded-lg transition-colors hover:text-primary hover:bg-primary/10"
        >
          <div>注册</div>
        </Link>
      </div>
    );
  }

  return (
    <button
      onClick={onLogout}
      className="flex items-center w-full p-4 gap-4 text-muted rounded-lg transition-colors hover:text-danger hover:bg-danger/5 cursor-pointer"
    >
      <LogOut className="h-6 w-6" />
      <div className="typo-nav-action">退出登录</div>
    </button>
  );
}
