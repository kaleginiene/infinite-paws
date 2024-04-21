import React, { useCallback, useRef, useEffect } from "react";
import { GalleryCard } from "./components/GalleryCard";
import { GalleryItem } from "./types";

interface InfiniteScrollGalleryProps {
  fetchData: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  galleryCardsList: GalleryItem[];
  shouldAutoFetch: boolean;
}

export const InfiniteScrollGallery: React.FC<InfiniteScrollGalleryProps> = ({
  fetchData,
  hasNextPage,
  isLoading,
  galleryCardsList,
  shouldAutoFetch,
}) => {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: any) => {
      if (isLoading || !shouldAutoFetch) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && shouldAutoFetch) {
          fetchData();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchData, hasNextPage, isLoading, shouldAutoFetch]
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {galleryCardsList.map((card, index) => (
        <GalleryCard
          key={`${card.id}_${index}`}
          {...card}
          ref={index === galleryCardsList.length - 1 ? lastElementRef : null}
          isLoading={isLoading}
        />
      ))}
    </section>
  );
};
