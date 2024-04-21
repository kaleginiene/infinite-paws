import { GoogleAdProps } from "./GoogleAd";

export const useGoogleAdComponent = ({
  adId,
  adUnitPath,
  adSize,
}: GoogleAdProps) => {
  const loadAd = (): void => {
    const elementExists = document.getElementById(adId);
    if (!elementExists) return;

    window.googletag.cmd.push(() => {
      const slot = window.googletag.defineSlot(adUnitPath, adSize, adId);
      if (slot) {
        slot.addService(window.googletag.pubads());
        window.googletag.enableServices();
        window.googletag.display(adId);
      }
    });
  };

  const unmountAd = (): void => {
    window.removeEventListener("load", loadAd);
    window.googletag.cmd.push(() => {
      const slots = window.googletag.pubads().getSlots();
      const slot = slots.find((s) => s.getSlotElementId() === adId);
      if (slot) {
        window.googletag.destroySlots([slot]);
      }
    });
  };

  return {
    loadAd,
    unmountAd,
  };
};
