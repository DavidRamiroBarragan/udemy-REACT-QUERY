import InfiniteScroll       from 'react-infinite-scroller';
import { Species }          from './Species';
import { useInfiniteQuery } from 'react-query';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies () {
  const {
          data, fetchNextPage, hasNextPage, isFetching, isError, isLoading
        } = useInfiniteQuery('sw-species', ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastPage) => lastPage.next || undefined
  });
  if (isLoading) {
    return <div className="loading">Loading..</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {isFetching && <div className="loading">Loading..</div>}
    {data.pages.map((pagesData) => {
      return pagesData.results.map(specie => {
        return <Species averageLifespan={specie.average_lifespan} language={specie.language} name={specie.name}/>;
      });
    })}
  </InfiniteScroll>;
}
