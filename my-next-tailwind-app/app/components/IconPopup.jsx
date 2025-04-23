// components/IconPopup.jsx
'use client';

import { useState, useRef, useEffect } from 'react';

const IconPopup = ({ icon: Icon, children }) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popupRef}>
      <button onClick={() => setOpen(!open)} aria-label="Toggle popup">
        <Icon className="w-6 h-6 md:w-8 md:h-8 hover:text-white transition-colors" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md z-50 p-3 text-black max-h-96 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default IconPopup;
