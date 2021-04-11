import { useState, useEffect } from 'react';

// Given a reference, returns a boolean indicating whether the referred element is in focus
export const useInFocus = (ref) => {

  const [ inFocus, setInFocus ] = useState(false);

  useEffect(() => {

    // Element is out of focus
    const handleClickOutside = (e) => {
      if (inFocus && ref.current && !ref.current.contains(e.target)) {
        setInFocus(false);
      }
    };

    // Element is in focus
    const handleClickInside = (e) => {
      if (!inFocus && ref.current && ref.current.contains(e.target)) {
        setInFocus(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickInside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickInside);
    };
  }, [ref, inFocus]);

  return inFocus;
}