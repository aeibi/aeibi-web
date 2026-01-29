import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex px-4 py-1 gap-2 bg-surface rounded-lg">
      <Search className="h-5 w-5 text-muted" />
      <input
        type="search"
        placeholder="搜索"
        className="w-full typo-control-input placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}
