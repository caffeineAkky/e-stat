// 表タイトルの「1-N月」から公表済みの最終月 N を取り出す。読み取れなければ null
export default function parseLastPublishedMonth(title: string | undefined): number | null {
    const matched = title?.match(/1-(\d{1,2})月/);
    if (!matched) return null;

    const month = Number(matched[1]);
    return month >= 1 && month <= 12 ? month : null;
}
