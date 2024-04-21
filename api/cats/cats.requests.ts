import { ApiConfig } from "../apiConfig";
import { CatGalleryItem } from "./cats.models";

type CatApiResponse = CatGalleryItem[];

export const getCatsGallery = async (
  pageParam: number = 0
): Promise<CatApiResponse> => {
  try {
    const response = await fetch(`${ApiConfig.baseURL}&page=${pageParam}`, {
      method: "GET",
      headers: {
        "x-api-key": ApiConfig.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch cat images: ${response.status} ${response.statusText}`
      );
    }

    const catsGallery: CatGalleryItem[] = await response.json();
    return catsGallery;
  } catch (error) {
    throw error;
  }
};
