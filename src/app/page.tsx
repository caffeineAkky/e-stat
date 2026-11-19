import type { SearchParams, TradeResult, TradeDataResult } from "@/types/estat";
import type { SearchConditions, ParseResult, SearchOptionResult, SearchFormOptions } from "@/types/search";
import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResult";
import NoResult from "@/components/NoResult";
import NoSearchOption from "@/components/NoSearchOption";
import getTradeData from "@/lib/estat/getTradeData";
import aggregateTradeData from "@/lib/estat/aggregateTradeData";
import getSearchOptions from "@/lib/estat/getSearchOptions";
import parseSearchParams from "@/lib/estat/parseSearchParams";
import isSelectableConditions from "@/lib/estat/isSelectableConditions";
import pickSelectableConditions from "@/lib/estat/pickSelectableConditions";
import { defaultStatsDataId } from "@/lib/estat/constants";

export default async function Home({ searchParams }: SearchParams) {

  const parsed: ParseResult = await parseSearchParams(searchParams);

  const searchOptionResult: SearchOptionResult = await getSearchOptions(
    parsed.status === "ok" ? parsed.conditions.tableDataId : defaultStatsDataId
  );

  if (searchOptionResult.status === "error") {
    return <NoSearchOption/>;
  }

  const searchOptions:SearchFormOptions = searchOptionResult.data;

  if (parsed.status === "empty") {
    return <SearchForm options={searchOptions}/>;
  }

  if (parsed.status === "invalid") {
    return (
      <div>
        <SearchForm options={searchOptions}/>
        <p>{parsed.message}</p>
      </div>
    );
  }

  const searchConditions: SearchConditions = parsed.conditions;

  if (!isSelectableConditions(searchConditions, searchOptions)) {
    return (
      <div>
        <SearchForm
          options={searchOptions}
          conditions={pickSelectableConditions(searchConditions, searchOptions)}
        />
        <p>選択肢に無い条件が指定されています</p>
      </div>
    );
  }

  const tradeResult: TradeDataResult = await getTradeData(searchConditions);
  
  if (tradeResult.status === "error") {
    return (
      <div>
        <SearchForm options={searchOptions} conditions={searchConditions}/>
        <p>{tradeResult.reason}</p>        
      </div>
    );
  }

  if (tradeResult.status === "empty") {
    return (
      <div>
        <SearchForm options={searchOptions} conditions={searchConditions}/>
        <NoResult/>
      </div>
    );
  }
  
  const result: TradeResult = aggregateTradeData(tradeResult.data);

  return (
    <div>
      <SearchForm options={searchOptions} conditions={searchConditions}/>
      <SearchResult result={result}/>
    </div>
  );
}
