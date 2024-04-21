import React, { useEffect } from "react";
import { GeneralSize } from "./types";

interface GoogleAdProps {
  adId: string;
  adUnitPath: string;
  adSize: GeneralSize;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ adId, adUnitPath, adSize }) => {
  useEffect(() => {
    if (window.googletag) {
      window.googletag.cmd.push(() => {
        const slot = window.googletag.defineSlot(adUnitPath, adSize, adId);
        if (slot !== null) {
          slot.addService(window.googletag.pubads());
          window.googletag.enableServices();
          window.googletag.display(adId);
        }
      });
    }
  }, [adId, adUnitPath, adSize]);

  return (
    <div className="w-full flex items-center justify-center h-[500px] border border-1 border-grey">
      <div id={adId} className="ad-slot" />
    </div>
  );
};

export default GoogleAd;
