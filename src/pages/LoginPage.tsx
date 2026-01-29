import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import icon from "@/assets/icon.svg";
import { useUserServiceLogin, type UserLoginRequest } from "@/api/generated";
import { token } from "@/api/client";

export function LoginPage() {
  const [form, setForm] = useState<UserLoginRequest>({
    account: "",
    password: "",
  });

  const { mutate, isPending, isError } = useUserServiceLogin({
    mutation: {
      onSuccess: (result) => {
        token.set(result.tokens);
        window.location.href = "/";
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
            <div className="text-xl font-semibold">登录</div>
            <div className="text-sm text-muted">欢迎回到 AeiBi</div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-muted">账号</span>
            <input
              value={form.account}
              onChange={(event) =>
                setForm({ ...form, account: event.target.value.trim() })
              }
              className="w-full rounded-lg border border-surface-subtle bg-surface px-4 py-3 typo-control-input outline-none focus:border-primary"
              placeholder="用户名 / 邮箱"
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
              placeholder="输入密码"
              autoComplete="current-password"
            />
          </label>

          {isError && (
            <div className="text-sm text-danger">
              登录失败，请检查账号和密码
            </div>
          )}

          <button
            type="submit"
            disabled={!form.account || !form.password || isPending}
            className="w-full rounded-lg bg-primary text-white py-3 typo-control-action transition-opacity disabled:opacity-60"
          >
            {isPending ? "登录中..." : "登录"}
          </button>
        </form>

        <div className="text-sm text-muted">
          还没有账号？{" "}
          <Link className="text-primary" to="/register">
            去注册
          </Link>
        </div>
      </div>
    </div>
  );
}
