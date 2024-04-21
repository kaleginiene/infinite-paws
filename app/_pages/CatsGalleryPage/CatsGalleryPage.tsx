"use client";
import React, { memo, useEffect, useState } from "react";
import { useCatsGalleryQuery } from "@/api/cats/queries/useCatsGalleryQuery";
import InfiniteScrollGallery from "@/features/infiniteScrollGallery/InfiniteScrollGallery";
import { GalleryItem } from "@/features/infiniteScrollGallery/types";

import Header from "./components/Header";
import CatsLoader from "./components/CatsLoader";
import Footer from "./components/Footer";

const STOP_AUTOFETCH_PAGE = 5;

const CatsGalleryPage: React.FC = () => {
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
  }, [currentPage, stopFetching]);

  const handleAutoFetchButton = (): void => {
    setShouldAutoFetch(true);
  };

  const galleryCards = data?.pages.flat() || [];

  return (
    <>
      <Header />
      <main className="container pt-[100px] pb-[60px] min-h-[90vh]">
        {isLoading && <CatsLoader text="Get ready for cats!" />}
        <InfiniteScrollGallery
          fetchData={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isLoading={isLoading}
          galleryCardsList={galleryCards as GalleryItem[]}
          shouldAutoFetch={shouldAutoFetch}
        />
        {!shouldAutoFetch && (
          <button
            className="primary-button m-auto my-4"
            onClick={handleAutoFetchButton}
          >
            Show me all the cats you have!
          </button>
        )}
        {isError && (
          <p className="my-4 text-center">
            Error loading the gallery: {error?.message}
          </p>
        )}
        {isFetchingNextPage && <CatsLoader text="Loading even more cats..." />}
      </main>
      <Footer />
    </>
  );
};

export default memo(CatsGalleryPage);
