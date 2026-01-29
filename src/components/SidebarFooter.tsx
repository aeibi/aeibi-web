import { Link } from "react-router-dom";

export function SidebarFooter() {
  return (
    <footer className="py-4 typo-sidebar-footer text-muted">
      <div className="flex gap-4">
        <Link
          to="/privacy"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          隐私政策
        </Link>
        <Link
          to="/terms"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          服务条款
        </Link>
        <Link
          to="/about"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          关于AeiBi
        </Link>
      </div>
      <div>© 2026 AeiBi Social</div>
    </footer>
  );
}
