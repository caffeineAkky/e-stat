import type { SearchParams, TradeResult, TradeDataResult } from "@/types/estat";
import type { SearchConditions, ParseResult, SearchOptionResult, SearchFormOptions } from "@/types/search";
import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResult";
import NoResult from "@/components/NoResult";
import NoSearchOption from "@/components/NoSearchOption";
import Notice from "@/components/Notice";
import getTradeData from "@/lib/estat/getTradeData";
import aggregateTradeData from "@/lib/estat/aggregateTradeData";
import getSearchOptions from "@/lib/estat/getSearchOptions";
import parseSearchParams from "@/lib/estat/parseSearchParams";
import isSelectableConditions from "@/lib/estat/isSelectableConditions";
import pickSelectableConditions from "@/lib/estat/pickSelectableConditions";
import { defaultStatsDataId } from "@/lib/estat/constants";

export default async function Home({ searchParams }: SearchParams) {

  const parsed: ParseResult = await parseSearchParams(searchParams);

  // 選択肢を作る統計表。フォームの年の初期値と同じ表になるようにする
  const tableId: string =
    parsed.status === "ok" || parsed.status === "changeYear"
      ? parsed.conditions.tableDataId
      : defaultStatsDataId;

  const searchOptionResult: SearchOptionResult = await getSearchOptions(tableId);

  if (searchOptionResult.status === "error") {
    return <NoSearchOption/>;
  }

  const searchOptions:SearchFormOptions = searchOptionResult.data;

  if (parsed.status === "empty") {
    return <SearchForm options={searchOptions} tableId={tableId}/>;
  }

  if (parsed.status === "invalid") {
    return (
      <div>
        <SearchForm options={searchOptions} tableId={tableId}/>
        <Notice variant="error" title={parsed.message}/>
      </div>
    );
  }

  if (parsed.status === "changeYear") {
    return (
      <SearchForm
        options={searchOptions}
        tableId={tableId}
        conditions={pickSelectableConditions(parsed.conditions, searchOptions)}
      />
    );
  }

  const searchConditions: SearchConditions = parsed.conditions;

  if (!isSelectableConditions(searchConditions, searchOptions)) {
    return (
      <div>
        <SearchForm
          options={searchOptions}
          tableId={tableId}
          conditions={pickSelectableConditions(searchConditions, searchOptions)}
        />
        <Notice variant="error" title="選択肢に無い条件が指定されています"/>
      </div>
    );
  }

  const tradeResult: TradeDataResult = await getTradeData(searchConditions);

  if (tradeResult.status === "error") {
    return (
      <div>
        <SearchForm options={searchOptions} tableId={tableId} conditions={searchConditions}/>
        <Notice variant="error" title={tradeResult.reason}/>
      </div>
    );
  }

  if (tradeResult.status === "empty") {
    return (
      <div>
        <SearchForm options={searchOptions} tableId={tableId} conditions={searchConditions}/>
        <NoResult/>
      </div>
    );
  }

  const result: TradeResult = aggregateTradeData(tradeResult.data);

  return (
    <div>
      <SearchForm options={searchOptions} tableId={tableId} conditions={searchConditions}/>
      <SearchResult result={result}/>
    </div>
  );
}
