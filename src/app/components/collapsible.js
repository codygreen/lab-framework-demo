// components/Collapsible.js
"use client";

import React, { useState } from "react";

/**
 * Represents a Collapsible component.
 * @param {string} props.title             - The title of the container.
 * @param {React.ReactNode} prop.children  - The content to display of the container.
 * @returns {JSX.Element} The Collapsible component.
 */
export function Collapsible({ title, children }) {
  const [isMinimized, setIsMinimized] = useState(true)

  const handleMinimizeClick = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`max-w-full bg-slate-200 rounded overflow-hidden shadow-lg border border-gray-300 ${isMinimized ? "h-55" : "h-auto"}`}>
      <div className="px-4 py-4">

        <div className="font-bold text-xl mb-2">{title}</div>
        <button
          className="inline-block bg-gray-500 text-white font-bold py-2 px-4 rounded m-2"
          onClick={handleMinimizeClick}>
          {isMinimized ? "Show" : "Hide"}
        </button>
        {!isMinimized && (
          <>
            {children}
          </>
        )}
      </div>
    </div>
  );
}
