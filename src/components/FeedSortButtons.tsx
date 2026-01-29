export function FeedSortButtons() {
  return (
    <>
      <button className="px-4 rounded-full bg-primary typo-control-filter text-white hover:bg-primary/90 transition-colors cursor-pointer">
        最新
      </button>
      <button className="px-4 rounded-full border border-muted typo-control-filter text-muted transition-colors hover:border-primary hover:text-primary hover:bg-primary/5 cursor-pointer">
        最热
      </button>
    </>
  );
}
