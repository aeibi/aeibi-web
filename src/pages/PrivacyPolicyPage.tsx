export function PrivacyPolicyPage() {
  return (
    <div className="h-screen max-w-2xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">隐私政策</h1>
        <p className="text-sm text-muted">最后更新：2026-01-01</p>
      </header>
      <section className="space-y-3 text-sm text-muted">
        <p>
          我们重视你的隐私。本页面说明我们在使用 AeiBi Social
          时会收集哪些信息、如何使用，以及你可以如何管理自己的数据。
        </p>
        <p>
          我们仅在提供服务所必需的范围内收集数据，例如账号信息、内容发布与互动记录。
        </p>
        <p>如有疑问或需要删除数据，请通过应用内反馈与我们联系。</p>
      </section>
    </div>
  );
}
