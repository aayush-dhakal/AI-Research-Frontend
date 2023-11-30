import { useEffect, useState } from "react";

const useScreenSize = () => {
  const isClient = typeof window === "object";

  const [screenSize, setScreenSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (isClient) {
      // Initial setup
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isClient]); // The dependency array includes isClient

  return screenSize;
};

export default useScreenSize;
