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

  const queryString = buildQueryString({
    brands: brand.length ? brand : undefined,
    rating,
    category: params.filter !== "all" ? params.filter : undefined,
    sort: sort.order || undefined,
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

export const buildQueryString = (
  params: Record<string, string | string[] | undefined>
) => {
  const query = Object.entries(params)
    .filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== "";
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(",")}`;
      }
      return `${key}=${value}`;
    })
    .join("&");

  return query ? `?${query}` : "";
};
