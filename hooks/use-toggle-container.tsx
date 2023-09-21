import React, { useState, useRef, useCallback } from "react";

function useToggleContainer(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggle = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
        setIsOpen(false);
      }
    },
    []
  );

  return { isOpen, toggle, containerRef, handleBlur };
}

export default useToggleContainer;
