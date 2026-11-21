import type { TradeResult } from "@/types/estat";
import removeCodePrefix from "@/lib/estat/removeCodePrefix";

// どのデータか一目で分かるよう「trade_{品目}_{国}_{年}.xlsx」にする。長い品目名も切り詰めない
// ファイル名に使えない文字はブラウザ（<a download>）が置き換えるので、ここでは無害化しない
export default function createExportFileName(result: TradeResult): string {
    const itemName = removeCodePrefix(result.item.name);
    const countryName = removeCodePrefix(result.country.name);
    const year = result.annualData[0].year;

    return `trade_${itemName}_${countryName}_${year}.xlsx`;
}
