import { token } from "@/api/client";
import {
  useFileServiceUploadFile,
  useUserServiceGetMe,
  useUserServiceUpdateMe,
  type UserUpdateMeRequest,
} from "@/api/generated";
import { fileSha256, fileToBase64, getFileUrl } from "@/lib/file";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<UserUpdateMeRequest>({});
  const { data: me, isSuccess, isLoading, isError } = useUserServiceGetMe();
  const { mutate, isPending } = useUserServiceUpdateMe({
    mutation: {
      onSuccess: () => {
        setForm({});
        setError("");
      },
      onError: () => {
        setError("更新失败，请重试");
      },
    },
  });

  const { mutate: uploadAvatar } = useFileServiceUploadFile({
    mutation: {
      onSuccess: (data) => {
        setForm({ ...form, avatarUrl: data.url });
        setError("");
      },
      onError: () => {
        setError("上传头像失败");
      },
    },
  });

  const handleUploadAvatar = async (file: File) => {
    try {
      const data = await fileToBase64(file);
      const checksum = crypto?.subtle ? await fileSha256(file) : undefined;
      uploadAvatar({
        data: { name: file.name, contentType: file.type, data, checksum },
      });
    } catch {
      setError("上传头像失败");
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ data: form });
  };

  useEffect(() => {
    if (isError) {
      token.clear();
      navigate("/", { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading || !isSuccess) return <></>;

  return (
    <div className="px-4 py-8">
      <form
        onSubmit={onSubmit}
        className="flex-1 bg-surface rounded-2xl shadow-sm p-6 space-y-6"
      >
        <div className="flex items-center gap-5">
          <img
            src={getFileUrl(form.avatarUrl || me.user.avatarUrl)}
            className="h-20 w-20 rounded-full object-cover border border-surface-subtle"
          />
          <div className="space-y-2">
            <label className="inline-flex items-center gap-2 rounded-lg border border-surface-subtle px-4 py-2 cursor-pointer typo-control-action text-muted hover:text-primary hover:border-primary transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    handleUploadAvatar(file);
                  }
                }}
              />
              上传新头像
            </label>
          </div>
        </div>
        <label className="block space-y-2">
          <span className="text-sm text-muted">用户名</span>
          <input
            value={form.username || me.user.username}
            onChange={(event) =>
              setForm({ ...form, username: event.target.value.trim() })
            }
            className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
            placeholder="输入用户名"
            autoComplete="username"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-muted">邮箱</span>
          <input
            type="email"
            value={form.email || me.user.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value.trim() })
            }
            className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
            placeholder="name@example.com"
            autoComplete="email"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-muted">昵称</span>
          <input
            value={form.nickname || me.user.nickname}
            onChange={(event) =>
              setForm({ ...form, nickname: event.target.value.trim() })
            }
            className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
            placeholder="你的昵称"
            autoComplete="nickname"
          />
        </label>

        {error && <div className="text-sm text-danger">{error}</div>}

        <button
          type="submit"
          disabled={
            (!form.username &&
              !form.email &&
              !form.nickname &&
              !form.avatarUrl) ||
            isPending
          }
          className="w-full rounded-lg bg-primary text-white py-3 typo-control-action transition-opacity disabled:opacity-60"
        >
          {isPending ? "注册中..." : "注册"}
        </button>
      </form>
    </div>
  );
}
