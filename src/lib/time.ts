type FeedTimeOptions = {
  locale?: string;
  weekdayStyle?: "long" | "short";
  timeZone?: string;
};

export function formatFeedTime(
  date: Date,
  now: Date = new Date(),
  options: FeedTimeOptions = {},
): string {
  const { locale = "zh-CN", weekdayStyle = "long", timeZone } = options;

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

  const fmtWeekday = new Intl.DateTimeFormat(locale, {
    weekday: weekdayStyle,
    ...(timeZone ? { timeZone } : {}),
  });

  const fmtMD = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    ...(timeZone ? { timeZone } : {}),
  });

  const fmtYMD = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(timeZone ? { timeZone } : {}),
  });

  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
  const absSec = Math.abs(diffSec);

  const sign = diffSec >= 0 ? -1 : 1;

  if (absSec < 60) return rtf.format(sign * absSec, "second");

  const absMin = Math.floor(absSec / 60);
  if (absMin < 60) return rtf.format(sign * absMin, "minute");

  const absHr = Math.floor(absMin / 60);
  if (absHr < 24) return rtf.format(sign * absHr, "hour");

  const absDay = Math.floor(absHr / 24);
  if (absDay < 7) return fmtWeekday.format(date);

  const sameYear = date.getFullYear() === now.getFullYear();
  return sameYear ? fmtMD.format(date) : fmtYMD.format(date);
}
