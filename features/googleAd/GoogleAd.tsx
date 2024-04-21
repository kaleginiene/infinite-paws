import React, { useEffect } from "react";
import { GeneralSize } from "./types";
import { useGoogleAdComponent } from "./useGoogleAdComponent";

export interface GoogleAdProps {
  adId: string;
  adUnitPath: string;
  adSize: GeneralSize;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ adId, adUnitPath, adSize }) => {
  const { loadAd, unmountAd } = useGoogleAdComponent({
    adId,
    adUnitPath,
    adSize,
  });

  useEffect(() => {
    //NOTEL Listen for GPT to become ready or wait for the DOM to be fully loaded
    if (window.googletag && window.googletag.apiReady) {
      loadAd();
    } else {
      window.addEventListener("load", loadAd);
    }

    return () => {
      unmountAd();
    };
  }, [adId, adUnitPath, adSize]);

  return (
    <div className="w-full flex items-center justify-center h-[500px] border border-1 border-grey">
      <div
        id={adId}
        className={`ad-slot w-[${adSize[0]}px] h-[${adSize[1]}px]`}
      />
    </div>
  );
};

export default GoogleAd;
