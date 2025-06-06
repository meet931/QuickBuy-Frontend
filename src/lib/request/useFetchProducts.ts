"use client";
import {
  setAllProducts,
  setAllProductLoading,
} from "@/redux/slice/productSlice";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { IAllProducts } from "../interface";
import axios from "axios";
import { useAppDispatch } from "@/redux/hooks";
import { get } from "@/helpers/axiosInstance";

const useFetchProducts = (query: string) => {

  const dispatch = useAppDispatch();

  // Fetch All Products (Unfiltered)
  const { isLoading, data } = useQuery(["products"], {

    queryFn: async (): Promise<IAllProducts[]> => {
      try {
        const { data } = await get(`/product/view`);
        return data;
      } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });

  // Fetch Filtered Products (When query exists)
  const { isLoading: filterLoading, data: filterData } = useQuery(
    ["products", query],
    {
      queryFn: async (): Promise<IAllProducts[]> => {

        try {
          const { data } = await get(`/product/view${query}`);
          return data;
        } catch (error) {
          console.error("Error fetching filtered products:", error);
          return [];
        }
      },
      enabled: !!query,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (query) {
      dispatch(setAllProductLoading(filterLoading));
      dispatch(setAllProducts(filterData || []));
    } else {
      dispatch(setAllProductLoading(isLoading));
      dispatch(setAllProducts(data || []));
    }
  }, [dispatch, data, query, filterData, filterLoading, isLoading]);

  return null;
};

export default useFetchProducts;
