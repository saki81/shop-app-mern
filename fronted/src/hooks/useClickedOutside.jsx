import { useEffect, useRef } from "react";

const useClickedOutside = (callback) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
          if(ref.current && !ref.current.contains(e.target)) {
            callback();
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [callback])

    return ref;
}

export default useClickedOutside;