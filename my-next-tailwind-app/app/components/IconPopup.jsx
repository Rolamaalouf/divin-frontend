"use client";

import React, { forwardRef } from "react";

const IconPopup = forwardRef(({ 
  icon: Icon, 
  count, 
  children, 
  open, 
  setOpen 
}, ref) => {
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} aria-label="Toggle popup">
        <Icon className="w-6 h-6 md:w-8 md:h-8 hover:text-white transition-colors" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed top-20 right-0 w-96 text-gray-600 bg-white shadow-lg rounded-lg p-6 z-50 max-h-[600px] overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
});

IconPopup.displayName = "IconPopup";

export default IconPopup;
