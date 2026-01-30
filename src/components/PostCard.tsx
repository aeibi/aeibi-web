import {
  Download,
  FileText,
  Heart,
  MessageCircleMore,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize, getFileUrl } from "@/lib/file";

export type PostAuthor = {
  uid: string;
  nickname: string;
  avatarUrl: string;
};

export type PostAttachment = {
  url: string;
  name: string;
  size: string;
};

export type Post = {
  uid: string;
  author: PostAuthor;
  time: string;
  text: string;
  images: string[];
  attachments: PostAttachment[];
  tags: string[];
  commentCount: string;
  collectionCount: string;
  likeCount: string;
  visibility: string;
  latestRepliedOn: string;
  ip: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const handleDownloadAttachment = (attachment: PostAttachment) => {
    const url = getFileUrl(attachment.url);
    const link = document.createElement("a");
    link.href = url;
    link.download = attachment.name || "";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <article className="p-4 space-y-4 bg-surface rounded-lg">
      <header className="flex gap-2 items-center w-full">
        <img
          src={getFileUrl(post.author.avatarUrl)}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <div className="typo-post-author">{post.author.nickname}</div>
          <button className="typo-meta-timestamp text-muted transition-colors hover:text-primary cursor-pointer">
            {post.time}
          </button>
        </div>
        <MoreHorizontal className="ml-auto h-4 w-4 text-muted cursor-pointer transition-colors hover:text-primary" />
      </header>

      <div className="pl-8 space-y-2">
        <div className="typo-post-body">{post.text}</div>

        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <button
              key={`${post.uid}-tag-${tag}`}
              className="typo-post-tag text-primary cursor-pointer transition-colors hover:text-primary/80"
            >
              # {tag}
            </button>
          ))}
        </div>

        {post.images && (
          <div
            className={cn("grid gap-2", {
              "grid-cols-2": post.images.length > 1,
            })}
          >
            {post.images.slice(0, 4).map((src, index) => (
              <div
                key={`${post.uid}-image-${index}`}
                className="aspect-18/10 overflow-hidden rounded-lg"
              >
                <img
                  src={getFileUrl(src)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {post.attachments && post.attachments.length > 0 && (
          <div className="space-y-2">
            {post.attachments.slice(0, 4).map((attachment) => (
              <div
                key={`${post.uid}-attachment-${attachment.url}`}
                className="flex items-center gap-4 p-2 bg-surface-subtle rounded-lg"
              >
                <div className="p-2 bg-surface rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="typo-attachment-name">{attachment.name}</div>
                  <div className="typo-meta-filesize text-muted">
                    {formatFileSize(attachment.size)}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto p-2 text-muted transition-colors hover:text-primary cursor-pointer"
                  onClick={() => handleDownloadAttachment(attachment)}
                >
                  <Download className="h-4 w-4 text-current" />
                </button>
              </div>
            ))}
          </div>
        )}

        <footer className="flex items-center gap-4 text-muted">
          <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <Heart className="h-4 w-4" />
            <div className="typo-post-metric">{post.likeCount}</div>
          </button>

          <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <MessageCircleMore className="h-4 w-4" />
            <div className="typo-post-metric">{post.commentCount}</div>
          </button>

          {/* <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <Bookmark className="h-4 w-4" />
            <div className="typo-post-metric">{post.bookmarked}</div>
          </button> */}

          <button className="ml-auto flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <Share2 className="h-4 w-4" />
          </button>
        </footer>
      </div>
    </article>
  );
}
