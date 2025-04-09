import React from "react";
import { CardContent, Card, CardHeader, CardFooter } from "./ui/card";
import { IProduct } from "@/lib/interface";
import Image from "next/image";
import { priceFormat } from "@/lib/utils";
import { Button } from "./ui/button";
import useDeviceSize from "@/lib/useDeviceSize";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, setTotal } from "@/redux/slice/cartSlice";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const Cards = ({ product }: { product: IProduct }) => {
  const { width } = useDeviceSize();
  const { toast } = useToast();
  const router = useRouter();

  const {    
    _id,
    // price,
    // title,
    // thumbnail,
    // discountPercentage,
    // rating,
    // discountPrice,
    productPrice,
    finalProductPrice,
    productName,
    productImages,
    rating,
  } = product;

  const dispatch = useAppDispatch();  

  // const discountPercentage = Math.round(
  //   ((productPrice - finalProductPrice) / productPrice) * 100
  // );

  const addToCartHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if(token) {
      dispatch(
        addToCart({
          _id,
          price: finalProductPrice,
          title: productName,
          img: productImages?.[0] || "",
          quantity: 1,
        })
      );
      dispatch(setTotal());
  
      toast({ title: "Product added in cart", variant: "success" });
    } else {
      router.push("/signin");
    }
  };

  return (
    <Link href={`/${_id}`}>
      <Card className="rounded-none grid items-center h-full">

        {/* Product Image */}
        <CardHeader className="bg-gray-50 aspect-1/85 items-center justify-center p-0">
          <figure className="h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${productImages[0]}`}
              width={width < 400 ? 100 : 200}
              height={width < 400 ? 100 : 200}
              alt={productName}
              className="brightness-[0.98] w-full h-full object-scale-down p-6"
            />
          </figure>
        </CardHeader>

        {/* Product Name, Rating, New Price, Old Price */}
        <CardContent className="md:p-4 md:pb-0 p-2 pb-0 text-lg">
          <p className="">
            {productName.length > 40 ? productName.slice(0, 40) + "..." : productName}
          </p>
          <div className="flex items-center">
            {/* <span className="text-[#f50514] text-sm flex-1">
              {discountPercentage}% OFF
            </span> */}
            {/* <span>{rating}</span> */}
          </div>

          <div className="flex items-center justify-between text-lg">
            <div className="flex items-center py-2 gap-1">
              <span className="font-medium">{priceFormat(finalProductPrice)}</span>
              <del className="text-gray-500 text-xs">
                {productPrice && priceFormat(productPrice)}
              </del>
            </div>
            <span>{rating}</span>            
          </div>
        </CardContent>

        
        <CardFooter className="md:p-4 md:pt-0 p-2 pt-0">
          <Button
            className="border w-full h-10 rounded-none"
            onClick={(e) => {
              addToCartHandle(e);
            }}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Cards;
