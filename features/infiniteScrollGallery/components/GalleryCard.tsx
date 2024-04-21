import Image from "next/image";
import React, { forwardRef } from "react";
import { GalleryItem } from "../types";

interface GalleryCardProps extends GalleryItem {
  isLoading: boolean;
}

export const GalleryCard = forwardRef<HTMLDivElement, GalleryCardProps>(
  ({ id, url, width, height }, ref) => (
    <>
      {url && (
        <div ref={ref}>
          <Image
            className="object-cover w-full h-[500px] border border-1 border-grey"
            src={url}
            alt={`Gallery image ${id}`}
            width={width}
            height={height}
            placeholder="empty"
            unoptimized={url.endsWith(".gif")}
          />
        </div>
      )}
    </>
  )
);

GalleryCard.displayName = "GalleryCard";
