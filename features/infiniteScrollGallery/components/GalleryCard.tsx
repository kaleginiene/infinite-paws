import Image from "next/image";
import React, { forwardRef } from "react";

interface GalleryCardProps {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const GalleryCard = forwardRef<HTMLDivElement, GalleryCardProps>(
  ({ id, url, width, height }, ref) => (
    <div ref={ref}>
      {url && (
        <Image
          src={url}
          alt={`Gallery image ${id}`}
          width={width}
          height={height}
          layout="responsive"
        />
      )}
    </div>
  )
);

GalleryCard.displayName = "GalleryCard";
