import Form from "next/form";
import type {
    SearchFormConditions,
    SearchFormOptions,
} from "@/types/search";
import SearchButton from "./SearchButton";
import { latestYearSearchValue } from "@/lib/estat/constants";

type SearchFormProps = {
    options: SearchFormOptions;
    conditions?: SearchFormConditions;
}

export default function SearchForm({
    options,
    conditions,
}: SearchFormProps) {
    return (
      <Form action="">
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
        <label>
            年
            <select name="year" defaultValue={conditions?.year ?? latestYearSearchValue}>
                {options.years.map((year) => (
                    <option key={year.yearSearchValue} value={year.yearSearchValue}>
                        {year.year}
                    </option>
                ))}
            </select>
        </label>

        <SearchButton />
      </Form>
    )
}
