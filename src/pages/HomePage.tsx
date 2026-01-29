import { SidebarFooter } from "@/components/SidebarFooter";
import { PostCard, type PostData } from "@/components/PostCard";
import {
  TrendingTopicsCard,
  type TrendingTopic,
} from "@/components/TrendingTopicsCard";
import {
  PostComposer,
  type PostComposerContent,
} from "@/components/PostComposer";
import { SearchBar } from "@/components/SearchBar";
import { FeedSortButtons } from "@/components/FeedSortButtons";
import { getFileUrl } from "@/lib/file";
import { usePostServiceCreatePost, useUserServiceGetMe } from "@/api/generated";

const mockPosts: PostData[] = [
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

const trendingTopics: TrendingTopic[] = [
  { title: "期末考试", count: 220 },
  { title: "生活碎片", count: 127 },
  { title: "学习资料", count: 98 },
  { title: "二手书交易", count: 51 },
  { title: "学科竞赛", count: 25 },
  { title: "英语选课", count: 25 },
  { title: "社团纳新", count: 15 },
  { title: "校园指南", count: 15 },
];

export function HomePage() {
  const { data: me, isSuccess } = useUserServiceGetMe();
  const { mutate: createPost } = usePostServiceCreatePost();

  const handleCreatePost = (content: PostComposerContent) => {
    createPost({
      data: {
        text: content.text,
        tags: content.tags,
        images: content.images,
        attachments: content.attachments,
        visibility: "PUBLIC",
      },
    });
  };

  const handleSaveDraft = (content: PostComposerContent) => {};

  return (
    <div className="flex gap-8">
      <div className="w-2xl space-y-4">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <SearchBar />
          </div>
          <FeedSortButtons />
        </div>
        {isSuccess && (
          <PostComposer
            avatar={getFileUrl(me.user.avatarUrl)}
            onPublish={handleCreatePost}
            onSaveDraft={handleSaveDraft}
          />
        )}
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="w-64 shrink-0 sticky top-0 self-start">
        <TrendingTopicsCard topics={trendingTopics} />
        <SidebarFooter />
      </div>
    </div>
  );
}
