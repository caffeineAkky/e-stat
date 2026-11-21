import type { SelectedOption } from "@/types/search";

// 全角・半角（英数字やカナ）と大文字・小文字の違いをそろえる
const normalize = (text: string): string => text.normalize("NFKC").toLowerCase();

// 入力した文字を名前に含む選択肢だけを、元の並び順のまま返す。入力が空なら全件を返す
export default function filterOptions(options: SelectedOption[], query: string): SelectedOption[] {
    const normalizedQuery = normalize(query).trim();
    if (normalizedQuery === "") return options;

    return options.filter((option) => normalize(option.label).includes(normalizedQuery));
}
