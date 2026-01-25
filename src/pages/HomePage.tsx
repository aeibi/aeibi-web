import {
  Paperclip,
  Hash,
  Smile,
  Image,
  MoreHorizontal,
  Bookmark,
  Download,
  FileText,
  Heart,
  MessageCircleMore,
  Share2,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockPosts = [
  {
    id: "post-1",
    author: "自由树",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=tree",
    time: "12分钟前",
    text: "不需要通关才能享受生活嘞",
    tags: ["生活碎片"],
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    ],
    likes: 3,
    comments: 3,
    bookmarked: 0,
  },
  {
    id: "post-2",
    author: "余小圆",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=circle",
    time: "昨天",
    text: "整理了一些传感器复习资料，有需要的自取👇",
    tags: ["学习资料", "期末考试"],
    attachments: [
      {
        name: "传感器原理期末重点.pdf",
        size: "4.2 MB",
      },
      {
        name: "历年真题及答案.zip",
        size: "12.8 MB",
      },
    ],
    likes: 19,
    comments: 5,
    bookmarked: 0,
  },
  {
    id: "post-3",
    author: "低语者",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=quiet",
    time: "1天前",
    text: "夜跑路上偶遇校猫，分享好运气 🐾",
    tags: ["校园碎片"],
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80",
    ],
    likes: 11,
    comments: 2,
    bookmarked: 1,
  },
];

const mockUser = {
  avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=quiet",
};

export function HomePage() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex px-4 py-1 gap-2 bg-surface rounded-lg">
          <Search className="h-5 w-5 text-muted" />
          <input
            type="search"
            placeholder="搜索"
            className="w-full text-[14px] font-normal placeholder:text-muted focus:outline-none"
          />
        </div>
        <button className="px-4 rounded-full bg-primary text-[14px] font-medium text-white hover:bg-primary/90 transition-colors cursor-pointer">
          最新
        </button>
        <button className="px-4 rounded-full border border-muted text-[14px] font-medium text-muted transition-colors hover:border-primary hover:text-primary hover:bg-primary/5 cursor-pointer">
          最热
        </button>
      </div>
      <div className="flex p-4 gap-2 bg-surface rounded-lg">
        <img src={mockUser.avatar} className="h-10 w-10 rounded-full" />
        <div className="space-y-2 w-full">
          <textarea
            id="post-content"
            name="post-content"
            placeholder="分享你的新鲜事..."
            className="min-h-20 w-full resize-none overflow-hidden bg-transparent text-[16px] font-medium placeholder:text-muted focus-visible:outline-none border-none"
          />
          <div className="flex items-center gap-4 text-primary">
            <button className="flex items-center gap-1 transition-colors hover:text-primary/80 cursor-pointer">
              <Paperclip className="h-5 w-5" />
            </button>

            <button className="flex items-center gap-1 transition-colors hover:text-primary/80 cursor-pointer">
              <Image className="h-5 w-5" />
            </button>

            <button className="flex items-center gap-1 transition-colors hover:text-primary/80 cursor-pointer">
              <Hash className="h-5 w-5" />
            </button>

            <button className="flex items-center gap-1 transition-colors hover:text-primary/80 cursor-pointer">
              <Smile className="h-5 w-5" />
            </button>

            <div className="flex-1" />

            <button className="px-4 rounded-full border border-primary text-[14px] font-medium transition-colors hover:bg-primary/10 cursor-pointer">
              发布
            </button>
            <button className="px-4 rounded-full border border-primary text-[14px] font-medium transition-colors hover:bg-primary/10 cursor-pointer">
              草稿
            </button>
          </div>
        </div>
      </div>
      {mockPosts.map((post) => (
        <article className="p-4 space-y-4 bg-surface rounded-lg">
          {/* header */}
          <header className="flex gap-2 items-center w-full">
            <img src={post.avatar} className="h-10 w-10 rounded-full" />
            <div>
              <div className="text-[14px] font-medium">{post.author}</div>
              <button className="text-xs font-normal text-muted transition-colors hover:text-primary cursor-pointer">
                {post.time}
              </button>
            </div>
            <MoreHorizontal className="ml-auto h-4 w-4 text-muted cursor-pointer transition-colors hover:text-primary" />
          </header>

          <div className="pl-8 space-y-2">
            {/* text */}
            <div className="text-[16px] font-medium">{post.text}</div>

            {/* tags */}
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <button className="text-[14px] font-medium text-primary cursor-pointer transition-colors hover:text-primary/80">
                  # {tag}
                </button>
              ))}
            </div>

            {/* images */}
            {post.images && (
              <div
                className={cn("grid gap-2", {
                  "grid-cols-2": post.images.length > 1,
                })}
              >
                {post.images.slice(0, 4).map((src) => (
                  <div className="aspect-18/10 overflow-hidden rounded-lg">
                    <img src={src} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* attachments */}
            {post.attachments && post.attachments.length > 0 && (
              <div className="space-y-2">
                {post.attachments.map((attachment) => (
                  <div className="flex items-center gap-4 p-2 bg-surface-subtle rounded-lg">
                    <div className="p-2 bg-surface rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-[14px] font-medium">
                        {attachment.name}
                      </div>
                      <div className="text-[12px] font-normal text-muted">
                        {attachment.size}
                      </div>
                    </div>
                    <button className="ml-auto p-2 text-muted transition-colors hover:text-primary cursor-pointer">
                      <Download className="h-4 w-4 text-current" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* actions */}
            <footer className="flex items-center gap-4 text-muted">
              <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
                <Heart className="h-4 w-4" />
                <div className="text-[14px] font-medium">{post.likes}</div>
              </button>

              <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
                <MessageCircleMore className="h-4 w-4" />
                <div className="text-[14px] font-medium">{post.comments}</div>
              </button>

              <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
                <Bookmark className="h-4 w-4" />
                <div className="text-[14px] font-medium">{post.comments}</div>
              </button>

              <button className="ml-auto flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
                <Share2 className="h-4 w-4" />
              </button>
            </footer>
          </div>
        </article>
      ))}
    </div>
  );
}
