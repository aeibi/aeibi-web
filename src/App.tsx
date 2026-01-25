import { Birdhouse, Hash, LogOut, MessageCircle, User } from "lucide-react";
import icon from "./assets/icon.svg";
import { HomePage } from "./pages/HomePage";
import './App.css'

const trendingTopics = [
  { title: "期末考试", count: 220 },
  { title: "生活碎片", count: 127 },
  { title: "学习资料", count: 98 },
  { title: "二手书交易", count: 51 },
  { title: "学科竞赛", count: 25 },
  { title: "英语选课", count: 25 },
  { title: "社团纳新", count: 15 },
  { title: "校园指南", count: 15 },
];

function App() {
  return (
    <div className="overflow-y-auto h-screen px-4 py-4">
      <div className="mx-auto max-w-7xl flex gap-8 items-start">
        <aside className="w-64 shrink-0 sticky top-0 h-[calc(100vh-2rem)] flex flex-col">
          <img src={icon} className="h-16 w-16" />

          <nav className="space-y-4">
            <button className="flex items-center w-full p-4 gap-4 text-primary bg-surface-subtle/50 rounded-lg hover:bg-surface-subtle/70 transition-colors cursor-pointer">
              <Birdhouse className="h-6 w-6" />
              <div className="typo-nav-item">首页</div>
            </button>
            <button className="flex items-center w-full p-4 gap-4 text-muted rounded-lg hover:bg-surface-subtle/70 transition-colors cursor-pointer">
              <Hash className="h-6 w-6" />
              <div className="typo-nav-item">话题</div>
            </button>
            <button className="flex items-center w-full p-4 gap-4 text-muted rounded-lg hover:bg-surface-subtle/70 transition-colors cursor-pointer">
              <MessageCircle className="h-6 w-6" />
              <div className="typo-nav-item">消息</div>
            </button>
            <button className="flex items-center w-full p-4 gap-4 text-muted rounded-lg hover:bg-surface-subtle/70 transition-colors cursor-pointer">
              <User className="h-6 w-6" />
              <div className="typo-nav-item">我的</div>
            </button>
          </nav>

          <button className="mt-auto flex items-center w-full p-4 gap-4 text-muted rounded-lg transition-colors hover:text-danger hover:bg-danger/5 focus-visible:text-danger focus-visible:bg-danger/10 focus-visible:outline-none cursor-pointer">
            <LogOut className="h-6 w-6" />
            <div className="typo-nav-action">退出登录</div>
          </button>
        </aside>

        <div className="w-2xl">
          <HomePage />
        </div>

        <div className="w-64 shrink-0 sticky top-0">
          <div className="p-4 space-y-4 bg-surface rounded-lg">
            <header className="flex items-center gap-4">
              <Hash className="h-6 w-6 text-primary" />
              <div className="typo-sidebar-title">热门话题</div>
            </header>
            {trendingTopics.map((tag) => (
              <button className="flex w-full items-center transition-colors hover:text-primary cursor-pointer">
                <div className="typo-sidebar-item"># {tag.title}</div>
                <div className="ml-auto typo-sidebar-item text-muted">
                  {tag.count}
                </div>
              </button>
            ))}
            <button className="w-full typo-sidebar-more text-muted transition-colors hover:text-primary cursor-pointer">
              查看更多
            </button>
          </div>
          <footer className="py-4 typo-sidebar-footer text-muted">
            <div className="flex gap-4">
              <button className="transition-colors hover:text-foreground cursor-pointer">
                隐私政策
              </button>
              <button className="transition-colors hover:text-foreground cursor-pointer">
                服务条款
              </button>
              <button className="transition-colors hover:text-foreground cursor-pointer">
                关于AeiBi
              </button>
            </div>
            <div>© 2026 AeiBi Social</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
