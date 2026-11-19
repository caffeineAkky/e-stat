import Form from "next/form";
import { Fragment } from "react";
import type { SearchFormConditions, SearchFormOptions } from "@/types/search";
import SearchButton from "@/components/SearchButton";
import YearSelect from "@/components/YearSelect";
import { latestYearSearchValue } from "@/lib/estat/constants";

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
      <Form action="">
        <Fragment key={selectsKey}>
          <label>
              年
              <YearSelect
                  years={options.years}
                  defaultValue={conditions?.year ?? latestYearSearchValue}
                  currentTableId={tableId}
              />
          </label>

          <label>
              国
              <select name="area" defaultValue={conditions?.area}>
                  {options.areas.map((area) => (
                      <option key={area.value} value={area.value}>
                          {area.label}
                      </option>
                  ))}
              </select>
          </label>

          <label>
              品目
              <select name="item" defaultValue={conditions?.item}>
                  {options.items.map((item) => (
                      <option key={item.value} value={item.value}>
                          {item.label}
                      </option>
                  ))}
              </select>
          </label>
        </Fragment>

        <SearchButton />
      </Form>
    )
}
