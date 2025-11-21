import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: "Ama Dablam 2025 (Hard Copy)",
  shortDescription: "A technical climbing journey of grit, vision and purpose.",
  description: "A technical climbing journey of grit, vision and purpose.",
  price: 1500,
  sizes: ["s", "m", "l", "xl", "xxl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/cover-cropped.png",
    purple: "/cover-cropped.png",
    green: "/cover-cropped.png",
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO:get the product from db
  // TEMPORARY
  return {
    title: product.name,
    describe: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
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
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">
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
            width={80} // Pesapal's full logo is usually a bit wider than Stripe's
            height={25}
            className="rounded-lg object-contain" // object-contain prevents the logo from getting squashed
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
