import { useEffect } from "react";

const useClickAway = (ref, cb) => {
  useEffect(() => {
    const handleClickAway = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [ref, cb]);
};

export default useClickAway;
