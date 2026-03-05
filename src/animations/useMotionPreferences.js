import { useEffect, useState } from "react";

const getConnection = () => {
  if (typeof navigator === "undefined") return null;
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
};

const getHardwareProfile = () => {
  if (typeof navigator === "undefined") {
    return { cores: 8, memory: 8 };
  }

  return {
    cores: navigator.hardwareConcurrency || 8,
    memory: navigator.deviceMemory || 8,
  };
};

export const getMotionPreferences = () => {
  if (typeof window === "undefined") {
    return {
      reducedMotion: false,
      lowPower: false,
      allowAnimation: true,
      allowAdvancedMotion: true,
    };
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const { cores, memory } = getHardwareProfile();
  const connection = getConnection();

  const saveData = Boolean(connection?.saveData);
  const lowHardware = cores <= 4 || memory <= 4;
  const lowPower = saveData || lowHardware || (coarsePointer && window.innerWidth < 900);

  return {
    reducedMotion,
    lowPower,
    allowAnimation: !reducedMotion && !lowPower,
    allowAdvancedMotion: !reducedMotion && !lowPower,
  };
};

export const useMotionPreferences = () => {
  const [prefs, setPrefs] = useState(getMotionPreferences);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefs(getMotionPreferences());

    media.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return prefs;
};
