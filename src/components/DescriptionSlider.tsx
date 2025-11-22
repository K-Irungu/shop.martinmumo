"use client";

const DescriptionSlider = ({ text }: { text: string }) => {
  // Split the text by double newlines
  const paragraphs = text.split("\n\n");

  return (
    <div className="flex flex-col gap-4 text-gray-600 leading-relaxed text-sm h-[150px] overflow-y-auto pr-2 custom-scrollbar">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default DescriptionSlider;