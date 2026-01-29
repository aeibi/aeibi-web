import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import icon from "@/assets/icon.svg";
import {
  useUserServiceCreateUser,
  type UserCreateUserRequest,
} from "@/api/generated";

export function RegisterPage() {
  const [form, setForm] = useState<UserCreateUserRequest>({
    username: "",
    password: "",
  });

  const { mutate, isPending, isError } = useUserServiceCreateUser({
    mutation: {
      onSuccess: () => {
        window.location.href = `/login`;
      },
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ data: form });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-sm p-6 space-y-6">
        <header className="flex items-center gap-3">
          <img src={icon} className="h-10 w-10" />
          <div>
            <div className="text-xl font-semibold">注册</div>
            <div className="text-sm text-muted">创建你的 AeiBi 账号</div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-muted">用户名</span>
            <input
              value={form.username}
              onChange={(event) =>
                setForm({ ...form, username: event.target.value.trim() })
              }
              className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
              placeholder="输入用户名"
              autoComplete="username"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-muted">密码</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value.trim() })
              }
              className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
              placeholder="设置密码"
              autoComplete="new-password"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-muted">邮箱（可选）</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value.trim() })
              }
              className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-muted">昵称（可选）</span>
            <input
              value={form.nickname}
              onChange={(event) =>
                setForm({ ...form, nickname: event.target.value.trim() })
              }
              className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
              placeholder="你的昵称"
              autoComplete="nickname"
            />
          </label>

          {isError && (
            <div className="text-sm text-danger">注册失败，请重试</div>
          )}

          <button
            type="submit"
            disabled={!form.username || !form.password || isPending}
            className="w-full rounded-lg bg-primary text-white py-3 typo-control-action transition-opacity disabled:opacity-60"
          >
            {isPending ? "注册中..." : "注册"}
          </button>
        </form>

        <div className="text-sm text-muted">
          已有账号？{" "}
          <Link className="text-primary" to="/login">
            去登录
          </Link>
        </div>
      </div>
    </div>
  );
}
