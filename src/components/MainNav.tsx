import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type MainNavItem = {
  key: string;
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
};

type MainNavProps = {
  items: MainNavItem[];
  ariaLabel: string;
};

export function MainNav({ items, ariaLabel }: MainNavProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="space-y-4">
        {items.map((item) => {
          return (
            <li key={item.key}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center w-full p-4 gap-4 rounded-lg transition-colors cursor-pointer",
                    "hover:bg-surface-subtle/70",
                    {
                      "text-primary bg-surface-subtle/50": isActive,
                      "text-muted": !isActive,
                    },
                  )
                }
              >
                <item.icon className="h-6 w-6" aria-hidden="true" />
                <span className="typo-nav-item">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
