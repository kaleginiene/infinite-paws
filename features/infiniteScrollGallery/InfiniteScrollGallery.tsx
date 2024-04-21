import React, { useCallback, useRef, useEffect } from "react";
import { GalleryCard } from "./components/GalleryCard";
import { GalleryItem } from "./types";

interface InfiniteScrollGalleryProps {
  fetchData: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  galleryCardsList: GalleryItem[];
}

export const InfiniteScrollGallery: React.FC<InfiniteScrollGalleryProps> = ({
  fetchData,
  hasNextPage,
  isLoading,
  galleryCardsList,
}) => {
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchData, hasNextPage, isLoading]
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <section>
      {galleryCardsList.map((card, index) => (
        <GalleryCard
          key={card.id}
          {...card}
          ref={index === galleryCardsList.length - 1 ? lastElementRef : null}
        />
      ))}
    </section>
  );
};
