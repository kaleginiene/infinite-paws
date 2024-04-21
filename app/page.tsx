"use client";
import React, { useEffect, useState } from "react";
import { useCatsGalleryQuery } from "@/api/cats/queries/useCatsGalleryQuery";
import { InfiniteScrollGallery } from "@/features/infiniteScrollGallery/InfiniteScrollGallery";
import { GalleryItem } from "@/features/infiniteScrollGallery/types";

const STOP_AUTOFETCH_PAGE = 5;

export default function Home() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useCatsGalleryQuery();
  const [shouldAutoFetch, setShouldAutoFetch] = useState(true);
  const currentPage = data?.pages.length;
  const stopFetching: boolean = currentPage === STOP_AUTOFETCH_PAGE;

  useEffect(() => {
    if (stopFetching) {
      setShouldAutoFetch(false);
    }
  }, [currentPage]);

  const handleAutoFetchButton = (): void => {
    setShouldAutoFetch(true);
  };

  const galleryCards = data?.pages.flat() || [];

  return (
    <main className="md:max-w-[1200px] m-auto px-[16px] py-[48px] h-full">
      {isLoading && <p>Loading bunch of cats. Get ready!</p>}
      <InfiniteScrollGallery
        fetchData={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isLoading={isLoading}
        galleryCardsList={galleryCards as GalleryItem[]}
        shouldAutoFetch={shouldAutoFetch}
      />
      {!shouldAutoFetch && (
        <button className="m-auto block my-4" onClick={handleAutoFetchButton}>
          Show me all the cats you have!
        </button>
      )}
      {isError && <p>Error loading the gallery: {error?.message}</p>}
      {isFetchingNextPage && <p>Loading more cats...</p>}
    </main>
  );
}
