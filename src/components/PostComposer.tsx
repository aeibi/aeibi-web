import { getFileUrl } from "@/lib/file";
import { cn } from "@/lib/utils";
import { FileText, Hash, Image, Paperclip, X } from "lucide-react";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";

export type PostComposerAttachment = {
  url: string;
  name: string;
  size: string;
};

export type PostComposerContent = {
  text: string;
  visibility: "PUBLIC" | "PRIVATE";
  tags: string[];
  images: string[];
  attachments: PostComposerAttachment[];
};

type PostComposerProps = {
  avatar: string;
  content: PostComposerContent;
  setContent: Dispatch<SetStateAction<PostComposerContent>>;
  onPublish: (content: PostComposerContent) => void;
  onUploadImage: (file: File[]) => void;
  onUploadAttachment: (file: File[]) => void;
};

export function PostComposer({
  avatar,
  content,
  setContent,
  onPublish,
  onUploadImage,
  onUploadAttachment,
}: PostComposerProps) {
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const addTag = (rawTag?: string) => {
    const tag = (rawTag ?? tagInput).trim().replace(/^#/, "");
    if (!tag) return;
    setContent((prev) => {
      const tags = prev.tags ?? [];
      if (tags.includes(tag)) return prev;
      return { ...prev, tags: [...tags, tag] };
    });
    setTagInput("");
    setShowTagInput(false);
  };

  const handleAddTag = () => {
    if (!showTagInput) {
      setShowTagInput(true);
      requestAnimationFrame(() => tagInputRef.current?.focus());
      return;
    }
    if (!tagInput.trim()) return;
    addTag();
  };

  const removeTag = (tagToRemove: string) => {
    setContent((prev) => {
      const tags = prev.tags ?? [];
      if (!tags.length) return prev;
      return { ...prev, tags: tags.filter((tag) => tag !== tagToRemove) };
    });
  };

  const removeImageAt = (indexToRemove: number) => {
    setContent((prev) => {
      const images = prev.images ?? [];
      if (indexToRemove < 0 || indexToRemove >= images.length) return prev;
      return {
        ...prev,
        images: images.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  const removeAttachmentAt = (indexToRemove: number) => {
    setContent((prev) => {
      const attachments = prev.attachments ?? [];
      if (indexToRemove < 0 || indexToRemove >= attachments.length) return prev;
      return {
        ...prev,
        attachments: attachments.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  return (
    <div className="flex p-4 gap-2 bg-surface rounded-lg">
      <img src={getFileUrl(avatar)} className="h-10 w-10 rounded-full" />
      <div className="space-y-2 w-full">
        <textarea
          id="post-content"
          name="post-content"
          placeholder="分享你的新鲜事..."
          className="min-h-20 w-full overflow-auto typo-composer-body placeholder:text-muted border-none focus:outline-none"
          value={content.text}
          onChange={(event) =>
            setContent((prev) => ({ ...prev, text: event.target.value }))
          }
        />

        <div className="flex flex-wrap gap-2">
          {content.tags?.map((tag) => (
            <div
              key={`composer-tag-${tag}`}
              className="group relative inline-flex items-center pr-5"
            >
              <span className="typo-post-tag text-primary transition-colors group-hover:text-primary/80">
                # {tag}
              </span>
              <X
                type="button"
                className="h-3 w-3 absolute right-0.5 top-0.5 text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary"
                onClick={() => removeTag(tag)}
              />
            </div>
          ))}
          {showTagInput && (
            <input
              ref={tagInputRef}
              type="text"
              value={tagInput}
              placeholder="添加标签"
              className="typo-post-tag w-24 rounded-full border border-surface-subtle bg-surface px-2 py-1 text-primary placeholder:text-muted outline-none focus:border-primary"
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                event.preventDefault();
                addTag();
              }}
              onBlur={() => {
                if (!tagInput.trim()) {
                  setShowTagInput(false);
                }
              }}
            />
          )}
        </div>

        <div
          className={cn("grid gap-2", {
            "grid-cols-2": content.images && content.images.length > 1,
          })}
        >
          {content.images?.slice(0, 4).map((src, index) => (
            <div
              key={`composer-image-${index}`}
              className="group relative aspect-18/10 overflow-hidden rounded-lg"
            >
              <img
                src={getFileUrl(src)}
                className="w-full h-full object-cover"
              />
              <X
                type="button"
                className="h-3 w-3 absolute right-0.5 top-0.5 text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary"
                onClick={() => removeImageAt(index)}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {content.attachments?.slice(0, 4).map((attachment, index) => (
            <div
              key={`composer-attachment-${attachment.url}`}
              className="group relative flex items-center gap-4 p-2 pr-10 bg-surface-subtle rounded-lg"
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
              <X
                type="button"
                className="h-3 w-3 absolute right-0.5 top-0.5 text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary"
                onClick={() => removeAttachmentAt(index)}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-primary">
          <label
            className="flex items-center gap-1 transition-colors hover:text-primary/80 cursor-pointer"
            title="添加附件"
          >
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []);
                onUploadAttachment(files);
              }}
            />
            <Paperclip className="h-5 w-5" />
          </label>

          <label
            className="flex items-center gap-1 transition-colors hover:text-primary/80 cursor-pointer"
            title="添加图片"
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []);
                onUploadImage(files);
              }}
            />
            <Image className="h-5 w-5" />
          </label>

          <button
            type="button"
            className="flex items-center gap-1 transition-colors hover:text-primary/80 cursor-pointer"
            onClick={() => handleAddTag()}
          >
            <Hash className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <button
            type="button"
            className="px-4 rounded-full border border-primary typo-control-action transition-colors hover:bg-primary/10 cursor-pointer"
            onClick={() => onPublish(content)}
            disabled={!content.text.trim()}
          >
            发布
          </button>
        </div>
      </div>
    </div>
  );
}
