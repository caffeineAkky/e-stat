// 見出しの後ろに付ける単位を作る。単位が無い品目では「数量()」にならないよう括弧ごと省く
export default function toUnitSuffix(unitLabel: string | undefined): string {
    return unitLabel ? `(${unitLabel})` : "";
}
