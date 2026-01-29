import { Hash } from "lucide-react";

export type TrendingTopic = {
  title: string;
  count: number;
};

type TrendingTopicsCardProps = {
  topics: TrendingTopic[];
};

export function TrendingTopicsCard({ topics }: TrendingTopicsCardProps) {
  return (
    <div className="p-4 space-y-4 bg-surface rounded-lg">
      <header className="flex items-center gap-4">
        <Hash className="h-6 w-6 text-primary" />
        <div className="typo-sidebar-title">热门话题</div>
      </header>
      {topics.map((topic) => (
        <button
          key={topic.title}
          className="flex w-full items-center transition-colors hover:text-primary cursor-pointer"
        >
          <div className="typo-sidebar-item"># {topic.title}</div>
          <div className="ml-auto typo-sidebar-item text-muted">
            {topic.count}
          </div>
        </button>
      ))}
      <button className="w-full typo-sidebar-more text-muted transition-colors hover:text-primary cursor-pointer">
        查看更多
      </button>
    </div>
  );
}
