"use client";

import Categories from "@/components/store/Categories";
import Filters from "@/components/store/Filters";
import useFetchProducts from "@/lib/request/useFetchProducts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { setOpenFilter } from "@/redux/slice/filterSlice";
import Loading from "../loading";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { brand, openFilter, sort, rating, offer } = useAppSelector(
    (state) => state.filter
  );

  // const idFilter = brand.length > 0 ? `&brands=${brand.join("&brands=")}` : "";
  // const brandFilter = brand.length > 0 ? `&brands=${brand.join("&brands=")}` : "";
  // const catFilter =
  //   params.filter === "all"
  //     ? ""
  //     : params.filter
  //     ? `&category=${params.filter}`
  //     : "";
  // const sortFilter = sort.order !== "" ? `${(sort.field = sort.order)}` : "";
  // const ratingFilter = rating !== "" ? `&rating=${rating}` : "";
  // // const offerFilter = offer !== "" ? `&discountPercentage=${offer}` : "";

  // useFetchProducts(`${brandFilter}${ratingFilter}${catFilter}${sortFilter}`);
  // useFetchProducts(`${brandFilter}${catFilter}${ratingFilter}${offerFilter}`);

  const queryString = buildQueryString({
    brands: brand,
    rating,
    category: params.filter !== "all" ? params.filter : undefined,
    sort: sort.order !== "" ? `${sort.field}:${sort.order}` : undefined,
  });
  
  useFetchProducts(queryString);
  

  return (
    <main className="overflow-hidden">
      <Suspense fallback={<Loading />}>
        <Categories />
        <section className="grid lg:grid-cols-[300px_1fr] md:grid-cols-[250px_1fr] relative border-t">
          {openFilter && (
            <div
              className="fixed inset-0 bg-black/60"
              onClick={() => dispatch(setOpenFilter(false))}
            ></div>
          )}
          <Filters />
          {children}
        </section>
      </Suspense>
    </main>
  );
};

export default StoreLayout;

const buildQueryString = (params: Record<string, string | string[] | undefined>) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== "" && value.length !== 0)
    .flatMap(([key, value]: any) =>
      Array.isArray(value)
        ? value.map((v) => `${key}=${encodeURIComponent(v)}`)
        : [`${key}=${encodeURIComponent(value)}`]
    )
    .join("&");

  return query ? `?${query}` : "";
};
