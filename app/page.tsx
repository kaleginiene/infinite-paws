"use client";
import React, { useEffect, useState } from "react";
import { useCatsGalleryQuery } from "@/api/cats/queries/useCatsGalleryQuery";
import { InfiniteScrollGallery } from "@/features/infiniteScrollGallery/InfiniteScrollGallery";
import { GalleryItem } from "@/features/infiniteScrollGallery/types";

const STOP_AUTOFETCH_PAGE = 5;

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useCatsGalleryQuery();
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InfiniteScrollGallery
        fetchData={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isLoading={isLoading}
        galleryCardsList={galleryCards as GalleryItem[]}
        shouldAutoFetch={shouldAutoFetch}
      />
      {!shouldAutoFetch && (
        <button onClick={handleAutoFetchButton}>
          Show me all the cats you have!
        </button>
      )}
      {isError && <p>Error loading the gallery: {error?.message}</p>}
      {isLoading && <p>Loading more items...</p>}
    </main>
  );
}
