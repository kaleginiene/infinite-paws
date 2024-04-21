import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { getCatsGallery } from "../cats.requests";
import { CatGalleryItem } from "../cats.models";

export const useCatsGalleryQuery = (): UseInfiniteQueryResult<
  InfiniteData<CatGalleryItem[], unknown>,
  Error
> =>
  useInfiniteQuery<CatGalleryItem[], Error>({
    queryKey: ["cats"],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      getCatsGallery(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length - 1 + 1; // Assuming the API pages are 1-indexed
    },
    initialPageParam: 0, // Explicitly set the initial page parameter
  });
