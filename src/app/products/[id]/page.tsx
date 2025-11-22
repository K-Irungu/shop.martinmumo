import ProductInteraction from "@/components/ProductInteraction";
import DescriptionSlider from "@/components/DescriptionSlider"; // <--- IMPORT THIS
import { ProductType } from "@/types";
import Image from "next/image";

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: "Beyond The Summit Pre-order (Hard Copy)",
  shortDescription: "A technical climbing journey of grit, vision and purpose.",
  description: "Beyond the Summit is a mountaineering memoir that reflects my six-year journey across some of the world’s most demanding landscapes, culminating in my ascent of Ama Dablam, one of the most technical and revered peaks on the planet. It captures my evolution as a climber: the early lessons, the setbacks, the discipline, and the quiet determination that shaped each expedition. More than the pursuit of a summit, this memoir explores the deeper impact of the mountains, how they build resilience, forge character, and challenge one’s understanding of fear, purpose, and possibility. It also honours the often-unseen heroes of every climb: the Sherpas, guides, porters, and support teams whose skill and spirit make these journeys possible. The book also takes you on a striking visual journey, immersing you in the landscapes, moments, and emotions that defined each step of this adventure. Beyond the Summit speaks to anyone drawn to stories of ambition and transformation. Whether you are an outdoor enthusiast, a corporate leader navigating demanding environments, or someone seeking inspiration through real acts of grit and perseverance, this book offers a powerful reflection on endurance, growth, and the human capacity to rise beyond perceived limits.",
  price: 1500,
  sizes: ["s", "m", "l", "xl", "xxl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/cover-cropped.png",
    purple: "/cover-cropped.png",
    green: "/cover-cropped.png",
  },
};

export const generateMetadata = async () => {
  return {
    title: product.name,
    description: product.description, // Fixed typo: "describe" -> "description"
  };
};

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);
  
  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12 items-center bg-black/5 rounded-lg px-5">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-2 py-6">
        <h1 className="text-2xl font-medium">{product.name}</h1>

        {/* REPLACED DIV WITH NEW COMPONENT */}
        <DescriptionSlider text={product.description} />

        <h2 className="text-2xl font-semibold mt-2">
          {" "}
          KES{" "}
          {product.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>

        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        {/* CARD INFO */}
        <div className="flex items-center gap-2 mt-4">
          Payment Method:
          <Image
            src="/pesapal.png"
            alt="Pesapal"
            width={80}
            height={25}
            className="rounded-lg object-contain"
          />
        </div>
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;