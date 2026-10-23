import type { SearchParams, TradeResult, FetchedTradeData } from "@/types/estat";
import type { SearchConditions, SearchFormOptions } from "@/types/search";
import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResult";
import NoResult from "@/components/NoResult";
import getTradeData from "@/lib/estat/getTradeData";
import aggregateTradeData from "@/lib/estat/aggregateTradeData";
import getSearchOptions from "@/lib/estat/getSearchOptions";
import parseSearchParams from "@/lib/estat/parseSearchParams";
import isSelectableConditions from "@/lib/estat/isSelectableConditions";

export default async function Home({ searchParams }: SearchParams) {
  const searchConditions: SearchConditions | null = await parseSearchParams(searchParams);
  const searchOptions: SearchFormOptions = await getSearchOptions(searchConditions?.tableDataId);

  if (!searchConditions || !isSelectableConditions(searchConditions, searchOptions)) {
    return <SearchForm options={searchOptions}/>
  }

  const tradeData: FetchedTradeData | null = await getTradeData(searchConditions);
  if (tradeData === null) {
    return (
      <div>
        <SearchForm options={searchOptions} conditions={searchConditions}/>
        <NoResult/>
      </div>
    );
  }
  const result: TradeResult = aggregateTradeData(tradeData);

  return (
    <div>
      <SearchForm options={searchOptions} conditions={searchConditions}/>
      <SearchResult result={result}/>
    </div>
  );
}
