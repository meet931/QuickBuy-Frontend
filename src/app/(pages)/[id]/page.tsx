"use client";
import Spinner from "@/components/Spinner";
import ProductImgSlider from "@/components/product/ProductImgSlider";
import { Button } from "@/components/ui/button";
import useFetchProductID from "@/lib/request/useFetchProductID";
import { priceFormat } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, setTotal } from "@/redux/slice/cartSlice";
import { Star, StarHalf } from "lucide-react";
import React from "react";

const colorHexMap: Record<string, string> = {
  "phantom black": "#000000",
  "phantom silver": "#C0C0C0",
  // add more as needed
};

const Page = ({ params }: { params: { id: string } }) => {
  useFetchProductID({ id: params.id });

  const dispatch = useAppDispatch();

  const { product, productLoading } = useFetchProductID({ id: params.id });
  console.log("Product: ", product);

  const addCartHandle = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.productName,
        quantity: 1,
        price: product.productPrice,
        img: product.productImages?.[0] || "",
      })
    );

    dispatch(setTotal());
  };

  if (productLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {product && (
        <>
          <div className="sm:flex block">
            <ProductImgSlider
              images={product.productImages.map(
                (img: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/${img}`
              )}
            />
            <div className="flex-1 p-4">
              <h1 className="text-4xl ">{product.productName}</h1>

              {/* -----RATING----- */}
              {product.rating && (
                <div className="flex items-center ga-2 py-2">
                  <span className="px-1 bg-orange-400 rounded-sm mr-2">
                    {product.rating}
                  </span>
                  {Array.from({ length: 5 }, (_, index) => {
                    const num = index + 0.5;
                    return (
                      <span key={index}>
                        {product.rating >= index + 1 ? (
                          <Star strokeWidth={1.25} size={18} />
                        ) : product.rating >= num ? (
                          <StarHalf strokeWidth={1.25} size={18} />
                        ) : (
                          ""
                        )}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* -----PRICE----- */}
              <div className="flex gap-2 py-4 items-center">
                <span className="text-2xl">
                  {priceFormat(product.finalProductPrice)}
                </span>
                {product.productPrice && (
                  <del className="text-gray-500 ">
                    {priceFormat(product.productPrice)}
                  </del>
                )}
              </div>

              {/* -----COLORS----- */}
              <div className="pb-2">
                <h2 className="text-xl pb-2">Colors</h2>
                <div className="flex items-center gap-2">
                  {console.log(product.colors)}
                  {product.colors?.map((color: any, index: number) => {
                    const normalized = color.toLowerCase();
                    const hex = colorHexMap[normalized] || "#ccc"; // fallback color

                    return (
                      <button
                        className="p-1 border w-32 flex items-center gap-1 rounded-md"
                        key={index}
                      >
                        <span
                          className="h-8 w-8 inline-block rounded-md"
                          style={{ backgroundColor: hex }}
                        ></span>
                        <span className="break-words text-sm">{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* -----HIGHLIGHTS----- */}
              <ul className="mt-3 text-lg">
                <h2 className="text-xl pb-2">Highlights</h2>
                {product.highlights?.map((highlight: any, index: number) => (
                  <li key={index} className="pb-1">
                    <span className="inline-block w-1 h-1 bg-black rounded-full mr-2"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* -----ADD TO CART & BUY NOW----- */}
          <div className="fixed inset-x-0 bottom-0 h-[72px] p-2 bg-white border border-t flex items-center md:justify-end justify-center gap-4 md:pr-32 sm:pr-12">
            <Button
              className="rounded-none max-sm:flex-1 w-48"
              size={"lg"}
              onClick={addCartHandle}
            >
              Add to Cart
            </Button>
            <Button
              variant={"destructive"}
              className="rounded-none max-sm:flex-1 w-48"
              size={"lg"}
            >
              Buy Now
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
