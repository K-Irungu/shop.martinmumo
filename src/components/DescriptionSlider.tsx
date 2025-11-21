"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DescriptionSlider = ({ text }: { text: string }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Logic to split text into 3 roughly equal parts without breaking words
  const parts = useMemo(() => {
    if (!text) return [""];
    
    const targetLength = Math.ceil(text.length / 3);
    const result = [];
    let remainingText = text;

    // Create the first 2 parts
    for (let i = 0; i < 2; i++) {
      // If remaining text is short, just take it all
      if (remainingText.length <= targetLength) {
        result.push(remainingText);
        remainingText = "";
        break;
      }

      // Look for a space near the target length to split safely
      let splitIndex = remainingText.lastIndexOf(" ", targetLength + 50); 
      
      // If no space found looking forward/back, just hard cut (fallback)
      if (splitIndex === -1) splitIndex = targetLength;

      result.push(remainingText.slice(0, splitIndex));
      remainingText = remainingText.slice(splitIndex);
    }

    // Add the final chunk
    if (remainingText) result.push(remainingText);

    return result;
  }, [text]);

  const handleNext = () => {
    if (currentPage < parts.length - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Text Display Area */}
      <div className="h-[120px] overflow-y-auto ">
        <p className="text-gray-500 text-sm leading-relaxed animate-in fade-in duration-300 key={currentPage}">
          {parts[currentPage]}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="cursor-pointer flex items-center gap-1 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        
        <span className="font-medium text-gray-900">
          {currentPage + 1} <span className="text-gray-300">/</span> {parts.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === parts.length - 1}
          className="cursor-pointer flex items-center gap-1 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DescriptionSlider;