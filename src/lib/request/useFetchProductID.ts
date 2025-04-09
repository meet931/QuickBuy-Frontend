import { get } from "@/helpers/axiosInstance";
import { useAppDispatch } from "@/redux/hooks";
import { setProduct, setProductLoading } from "@/redux/slice/productSlice";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const useFetchProductID = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery(["product", id], {
    queryFn: async () => {
      const { data } = await get(`/product/view?id=${id}`);
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    dispatch(setProductLoading(isLoading));
    dispatch(setProduct(data));
  }, [data, dispatch, isLoading]);

  // Returning both product and loading state for flexibility
  return {product: data, productLoading: isLoading};
};

export default useFetchProductID;

