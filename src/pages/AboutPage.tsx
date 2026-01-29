export function AboutPage() {
  return (
    <div className="h-screen max-w-2xl space-y-6 items-center flex flex-col mx-auto">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">关于 AeiBi</h1>
        <p className="text-sm text-muted">连接校园里的真实生活与想法。</p>
      </header>
      <section className="space-y-3 text-sm text-muted">
        <p>
          AeiBi Social
          是一个面向校园的轻社交平台，鼓励分享日常、学习资源和真实感受。
        </p>
        <p>
          我们希望用简单、温暖的设计连接彼此，让每一次互动都更轻松、更真诚。
        </p>
      </section>
    </div>
  );
}
