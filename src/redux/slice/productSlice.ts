import { IAllProducts, IProduct } from "@/lib/interface";
import { createSlice } from "@reduxjs/toolkit";
import { JSX } from "react";

interface InitialState {
  allProducts: IAllProducts;
  allProductLoading: boolean;
  product: IProduct;
  productLoading: boolean;
}

const initialState: InitialState = {
  allProducts: {
    page: 0,
    totalPages: 0,
    totalProducts: 0,
    products: [],
    length: 0,
    map: function (arg0: (product: any) => JSX.Element): import("react").ReactNode {
      throw new Error("Function not implemented.");
    }
  },
  product: {
    _id: "",
    brand: "",
    category: "",
    description: "",
    images: [],
    price: 0,
    thumbnail: "",
    title: "",
    colors: [],
    discountPercentage: 0,
    discountPrice: 0,
    highlights: [],
    rating: 0,
    sizes: [],
    stock: 0,
    type: "",
    
    productPrice: 0,
    finalProductPrice: 0,
    productName: "",
    productImages: [],
  },
  allProductLoading: false,
  productLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },

    setAllProductLoading: (state, action) => {
      state.allProductLoading = action.payload;
    },

    setProduct: (state, action) => {
      state.product = action.payload;
    },

    setProductLoading: (state, action) => {
      state.productLoading = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setAllProductLoading,
  setProduct,
  setProductLoading,
} = productSlice.actions;
export default productSlice.reducer;
