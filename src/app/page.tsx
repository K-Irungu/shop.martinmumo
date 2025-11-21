import ProductList from "@/components/ProductList";
import Image from "next/image";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  
  return (
    <div className="w-full">
      {/* Parent: relative + overflow-hidden + rounded-lg are critical */}
      <div className="relative aspect-2/1 w-full my-5 overflow-hidden rounded-lg bg-black/5">
        <Image 
          src="/cover.png" 
          alt="Featured Product" 
          fill 
          className="w-full px-10 py-5 object-contain" 
        />

        {/* --- RIBBON START --- */}
        {/* Adjustments made for "Pre-order now":
            1. w-52: Made wider to fit longer text.
            2. -left-14: Pulled further left to center the wider ribbon.
            3. top-6: Keeps it positioned nicely in the corner.
        */}
        <div className="absolute -left-14 top-7 z-10 w-52 -rotate-45 bg-red-600 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
          Pre-order now
        </div>
        {/* --- RIBBON END --- */}
        
      </div>
      <ProductList category={category} params="homepage"/>
    </div>
  );
};

export default Homepage;