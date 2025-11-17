
import { useEffect, useState } from "react";

/**
 * @param {React.RefObject[]} refArray 
 * @param {number} offset - opcioni offset (npr. visina headera u px)
 */
const useScrollToNewItem = (refArray, offset = 0) => {
  const [scrollIndex, setScrollIndex] = useState(null);

  const triggerScroll = (index) => {
    setScrollIndex(index);
  };

  useEffect(() => {
    if (scrollIndex === null) return;

    const attemptScroll = () => {
      const element = refArray.current[scrollIndex];
      if (element) {
        const rect = element.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;

        window.scrollTo({
          top: absoluteTop - offset, 
          behavior: "smooth",
        });

        setScrollIndex(null);
      } else {
        requestAnimationFrame(attemptScroll);
      }
    };

    attemptScroll();
  }, [scrollIndex, refArray, offset]);

  return { triggerScroll };
};

export default useScrollToNewItem;

