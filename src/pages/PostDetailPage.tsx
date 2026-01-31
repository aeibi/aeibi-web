import { SidebarFooter } from "@/components/SidebarFooter";
import { PostCard } from "@/components/PostCard";
import {
  TrendingTopicsCard,
  type TrendingTopic,
} from "@/components/TrendingTopicsCard";
import {
  usePostServiceDeletePost,
  usePostServiceGetPost,
  useUserServiceGetMe,
} from "@/api/generated";
import { formatFeedTime } from "@/lib/time";
import { useNavigate, useParams } from "react-router-dom";

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

export function PostDetailPage() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { data: me } = useUserServiceGetMe();
  const {
    data: post,
    isSuccess,
    isError,
  } = usePostServiceGetPost(uid ?? "", {
    query: { enabled: !!uid },
  });

  const { mutate: deletePost } = usePostServiceDeletePost({
    mutation: {
      onSuccess: () => {
        navigate("/home");
      },
    },
  });

  const onReport = (postUid: string) => {
    alert(`已举报动态 ${postUid}，感谢您的反馈！`);
  };

  const onDelete = (postUid: string) => {
    deletePost({ uid: postUid });
  };

  const onEdit = (postUid: string) => {
    console.log(`Edit post ${postUid}`);
  };

  return (
    <div className="flex gap-8">
      <div className="w-2xl space-y-4">
        {isSuccess && (
          <PostCard
            post={{
              ...post.post,
              time: formatFeedTime(
                new Date(1000 * Number(post.post.updatedAt)),
              ),
              images: Array.from(post.post.images),
              tags: Array.from(post.post.tags),
              attachments: Array.from(post.post.attachments),
            }}
            isAuthor={me?.user.uid === post.post.author.uid}
            onReport={() => onReport(post.post.uid)}
            onDelete={() => onDelete(post.post.uid)}
            onEdit={() => onEdit(post.post.uid)}
          />
        )}
        {isError && (
          <div className="rounded-lg bg-surface p-6 text-muted">
            帖子不存在或已被删除。
          </div>
        )}
      </div>
      <div className="w-64 shrink-0 sticky top-0 self-start">
        <TrendingTopicsCard topics={trendingTopics} />
        <SidebarFooter />
      </div>
    </div>
  );
}
