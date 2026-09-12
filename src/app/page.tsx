import type { SearchParams, TradeResult, FetchedTradeData } from "@/types/estat";
import type { SearchConditions, SearchFormOptions } from "@/types/search";
import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResult";
import getTradeData from "@/lib/estat/getTradeData";
import aggregateTradeData from "@/lib/estat/aggregateTradeData";
import getSearchOptions from "@/lib/estat/getSearchOptions";
import parseSearchParams from "@/lib/estat/parseSearchParams";

export default async function Home({ searchParams }: SearchParams) {
  const searchConditions: SearchConditions | null = await parseSearchParams(searchParams);
  const searchOptions: SearchFormOptions = await getSearchOptions();

  if(!searchConditions) {
    return <SearchForm options={searchOptions}/>
  }

  const tradeData: FetchedTradeData = await getTradeData(searchConditions);
  const result: TradeResult = aggregateTradeData(tradeData);

  return (
    <div>
      <SearchForm options={searchOptions} conditions={searchConditions}/>
      <SearchResult result={result}/>
    </div>
  );
}
