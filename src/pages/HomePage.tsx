import { SidebarFooter } from "@/components/SidebarFooter";
import { PostCard } from "@/components/PostCard";
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
import { useState } from "react";
import {
  usePostServiceCreatePost,
  usePostServiceListPosts,
  useUserServiceGetMe,
  useFileServiceUploadFile,
} from "@/api/generated";
import { formatFeedTime } from "@/lib/time";
import { fileSha256, fileToBase64, formatFileSize } from "@/lib/file";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const { data: me, isSuccess: isMeSuccess } = useUserServiceGetMe();
  const { data: posts, isSuccess: isPostsSuccess } = usePostServiceListPosts();
  const [composerContent, setComposerContent] = useState<PostComposerContent>({
    text: "",
    visibility: "PUBLIC",
  });
  const { mutateAsync: uploadAttachment } = useFileServiceUploadFile({
    mutation: {
      onSuccess: (data) =>
        setComposerContent({
          ...composerContent,
          attachments: (composerContent.attachments ?? []).concat({
            url: data.url,
            name: data.file.name,
            size: formatFileSize(data.file.size),
          }),
        }),
    },
  });
  const { mutateAsync: uploadImage } = useFileServiceUploadFile({
    mutation: {
      onSuccess: (data) =>
        setComposerContent({
          ...composerContent,
          images: (composerContent.images ?? []).concat(data.url),
        }),
    },
  });
  const { mutate: createPost } = usePostServiceCreatePost({
    mutation: {
      onSuccess: () => {
        setComposerContent({ text: "", visibility: "PUBLIC" });
        navigate(0);
      },
    },
  });

  const handleCreatePost = (content: PostComposerContent) => {
    createPost({
      data: {
        ...content,
        attachments: content.attachments?.map((att) => att.url) || [],
      },
    });
  };

  const onUploadImage = async (files: File[]) => {
    for (const file of files) {
      const data = await fileToBase64(file);
      const checksum = crypto?.subtle ? await fileSha256(file) : undefined;
      await uploadImage({
        data: { name: file.name, contentType: file.type, data, checksum },
      });
    }
  };

  const onUploadAttachment = async (files: File[]) => {
    for (const file of files) {
      const data = await fileToBase64(file);
      const checksum = crypto?.subtle ? await fileSha256(file) : undefined;
      await uploadAttachment({
        data: { name: file.name, contentType: file.type, data, checksum },
      });
    }
  };

  return (
    <div className="flex gap-8">
      <div className="w-2xl space-y-4">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <SearchBar />
          </div>
          <FeedSortButtons />
        </div>
        {isMeSuccess && (
          <PostComposer
            avatar={me.user.avatarUrl}
            content={composerContent}
            setContent={setComposerContent}
            onPublish={handleCreatePost}
            onUploadImage={onUploadImage}
            onUploadAttachment={onUploadAttachment}
          />
        )}
        {isPostsSuccess &&
          posts.posts.map((post) => (
            <PostCard
              key={post.uid}
              post={{
                ...post,
                time: formatFeedTime(new Date(1000 * Number(post.updatedAt))),
                images: Array.from(post.images ?? []),
                tags: Array.from(post.tags ?? []),
                attachments: Array.from(post.attachments ?? []),
              }}
            />
          ))}
      </div>
      <div className="w-64 shrink-0 sticky top-0 self-start">
        <TrendingTopicsCard topics={trendingTopics} />
        <SidebarFooter />
      </div>
    </div>
  );
}
