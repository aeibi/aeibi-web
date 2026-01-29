export function TermsPage() {
  return (
    <div className="h-screen max-w-2xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">服务条款</h1>
        <p className="text-sm text-muted">最后更新：2026-01-01</p>
      </header>
      <section className="space-y-3 text-sm text-muted">
        <p>
          使用 AeiBi Social
          表示你同意遵守本服务条款，包括内容发布规范与社区行为准则。
        </p>
        <p>
          请勿发布违法、侵权或令人不适的内容。我们保留对违规内容进行处理的权利。
        </p>
        <p>如果你对条款有任何疑问，欢迎随时与我们沟通。</p>
      </section>
    </div>
  );
}
