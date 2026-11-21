import { quantityUnitLabels } from "./constants";

// e-Stat が返す単位コード（全角の「ＮＯ」など）を表示名に変える。対応表に無ければコードをそのまま返す
export default function toQuantityUnitLabel(code: string | undefined): string | undefined {
    const normalizedCode = code?.normalize("NFKC").trim();

    if (!normalizedCode) {
        return undefined;
    }

    return quantityUnitLabels[normalizedCode] ?? normalizedCode;
}
