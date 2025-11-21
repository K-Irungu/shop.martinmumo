"use client";

const DescriptionSlider = ({ text }: { text: string }) => {
  return (
    <div className="h-[150px] overflow-y-auto pr-2 custom-scrollbar">
      <p className="text-gray-500 text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default DescriptionSlider;