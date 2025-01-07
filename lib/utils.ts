export function formatToWon(price: number): string {
    return price.toLocaleString('ko-KR')
}

export function formatToTimeAgo(date: string): string {
    const dayInMs = 1000 * 60 * 60 * 24;
    const time = new Date(date).getTime()
    const now = new Date().getTime()
    const diff = Math.round((time - now) / dayInMs);
    // 오늘 날짜보다 더 전에 만들어졌으면 -1, -2, -3
    // 오늘 만들어졌으면 0

    const formatter = new Intl.RelativeTimeFormat("ko");
    return formatter.format(diff, "days");
}