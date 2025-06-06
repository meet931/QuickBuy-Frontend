"use client";

import React from "react";
import Cards from "../Card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOpenFilter } from "@/redux/slice/filterSlice";
import { Filter } from "lucide-react";
import Spinner from "../Spinner";

const ProductList = () => {
  const dispatch = useAppDispatch();

  const { allProducts, allProductLoading } = useAppSelector(
    (state) => state.product
  );

  if (allProductLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="md:p-4 p-2">
      {allProducts && (
        <button
          onClick={() => dispatch(setOpenFilter(true))}
          className="md:hidden pt-2 pb-4 flex gap-1 items-center"
        >
          Sort & Filter <Filter strokeWidth={1.25} size={20} />
        </button>
      )}
      <div className={allProducts.length > 0 ? "grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 sm:gap-4 gap-2": ""}>
        {allProducts.length > 0 ? (
          allProducts?.map((product: any) => (
            <Cards product={product} key={product._id} />
          ))
        ) : (
          <div className="text-center p-7">Sorry! There is no product related to your query.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
