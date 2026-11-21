import Form from "next/form";
import { Fragment } from "react";
import type { SearchFormConditions, SearchFormOptions } from "@/types/search";
import SearchButton from "@/components/SearchButton";
import YearSelect from "@/components/YearSelect";
import ItemCombobox from "@/components/ItemCombobox";
import { latestYearSearchValue } from "@/lib/estat/constants";

const labelClassName = "flex flex-col gap-1";
const labelTextClassName = "text-sm font-bold";
// 品目名は長いので、列の幅を超えたら select の中で切れるように min-w-0 を付ける。
// ブラウザ標準の select は line-height が効かず padding だけでは高さが決まらないので、
// 高さは h-10 で明示して検索ボタンと揃える
const selectClassName =
    "h-10 w-full min-w-0 rounded-md border border-foreground/30 bg-background px-3 text-foreground";

type SearchFormProps = {
    options: SearchFormOptions;
    // options（国・品目）の取得元の統計表ID
    tableId: string;
    conditions?: SearchFormConditions;
}

export default function SearchForm({
    options,
    tableId,
    conditions,
}: SearchFormProps) {
    // select は defaultValue による非制御コンポーネントなので、
    // 統計表か選択値（URL）が変わったら select を作り直して初期値を反映させる。
    // 同じ統計表を使う年どうしを「戻る」「進む」で行き来したときも URL と一致させるため、選択値も含める
    const selectsKey: string = [tableId, conditions?.year, conditions?.area, conditions?.item].join(":");

    return (
      // 文字列 action の <Form> に key を渡すのはサポート外なので、key は内側に付ける
      <Form
        action=""
        className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
      >
        <Fragment key={selectsKey}>
          <label className={labelClassName}>
              <span className={labelTextClassName}>年</span>
              <YearSelect
                  years={options.years}
                  defaultValue={conditions?.year ?? latestYearSearchValue}
                  currentTableId={tableId}
              />
          </label>

          <label className={labelClassName}>
              <span className={labelTextClassName}>国</span>
              <select name="area" defaultValue={conditions?.area} className={selectClassName}>
                  {options.areas.map((area) => (
                      <option key={area.value} value={area.value}>
                          {area.label}
                      </option>
                  ))}
              </select>
          </label>

          {/* 候補リストの文字がアクセシブルネームに入らないよう、ラベルはコンボボックス側で持つ */}
          <ItemCombobox label="品目" items={options.items} defaultValue={conditions?.item} />
        </Fragment>

        <SearchButton />
      </Form>
    )
}
