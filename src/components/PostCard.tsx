import {
  Bookmark,
  Download,
  FileText,
  Heart,
  MessageCircleMore,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type PostAttachment = {
  name: string;
  size: string;
};

export type PostData = {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  tags: string[];
  images?: string[];
  attachments?: PostAttachment[];
  likes: number;
  comments: number;
  bookmarked: number;
};

type PostCardProps = {
  post: PostData;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="p-4 space-y-4 bg-surface rounded-lg">
      <header className="flex gap-2 items-center w-full">
        <img src={post.avatar} className="h-10 w-10 rounded-full" />
        <div>
          <div className="typo-post-author">{post.author}</div>
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
              key={`${post.id}-tag-${tag}`}
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
                key={`${post.id}-image-${index}`}
                className="aspect-18/10 overflow-hidden rounded-lg"
              >
                <img src={src} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {post.attachments && post.attachments.length > 0 && (
          <div className="space-y-2">
            {post.attachments.map((attachment) => (
              <div
                key={`${post.id}-attachment-${attachment.name}`}
                className="flex items-center gap-4 p-2 bg-surface-subtle rounded-lg"
              >
                <div className="p-2 bg-surface rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="typo-attachment-name">{attachment.name}</div>
                  <div className="typo-meta-filesize text-muted">
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

        <footer className="flex items-center gap-4 text-muted">
          <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <Heart className="h-4 w-4" />
            <div className="typo-post-metric">{post.likes}</div>
          </button>

          <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <MessageCircleMore className="h-4 w-4" />
            <div className="typo-post-metric">{post.comments}</div>
          </button>

          <button className="flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <Bookmark className="h-4 w-4" />
            <div className="typo-post-metric">{post.bookmarked}</div>
          </button>

          <button className="ml-auto flex items-center gap-1 transition-colors hover:text-primary cursor-pointer">
            <Share2 className="h-4 w-4" />
          </button>
        </footer>
      </div>
    </article>
  );
}
