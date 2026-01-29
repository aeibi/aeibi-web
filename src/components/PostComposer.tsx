import { useState } from "react";
import { Hash, Image, Paperclip, Smile } from "lucide-react";

export type PostComposerContent = {
  text: string;
  tags?: string[];
  images?: string[];
  attachments?: string[];
};

type PostComposerProps = {
  avatar: string;
  onPublish: (content: PostComposerContent) => void;
  onSaveDraft: (content: PostComposerContent) => void;
};

export function PostComposer({
  avatar,
  onPublish,
  onSaveDraft,
}: PostComposerProps) {
  const [content, setContent] = useState<PostComposerContent>({ text: "" });
  return (
    <div className="flex p-4 gap-2 bg-surface rounded-lg">
      <img src={avatar} className="h-10 w-10 rounded-full" />
      <div className="space-y-2 w-full">
        <textarea
          id="post-content"
          name="post-content"
          placeholder="分享你的新鲜事..."
          className="min-h-20 w-full overflow-auto typo-composer-body placeholder:text-muted border-none focus:outline-none"
          value={content.text}
          onChange={(event) =>
            setContent({ ...content, text: event.target.value })
          }
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

          <button
            type="button"
            className="px-4 rounded-full border border-primary typo-control-action transition-colors hover:bg-primary/10 cursor-pointer"
            onClick={() => onPublish(content)}
          >
            发布
          </button>
          <button
            type="button"
            className="px-4 rounded-full border border-primary typo-control-action transition-colors hover:bg-primary/10 cursor-pointer"
            onClick={() => onSaveDraft(content)}
          >
            草稿
          </button>
        </div>
      </div>
    </div>
  );
}
