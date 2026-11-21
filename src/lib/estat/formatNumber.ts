const numberFormat = new Intl.NumberFormat("ja-JP");

// 数量・金額を表に出すため「1,234,567」の形にする。値が無い（null / undefined）ときは "-" にする
// 0 は「1単位未満を四捨五入した値」で値が無いわけではないので、"-" ではなく "0" にする
export default function formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined) return "-";
    return numberFormat.format(value);
}
