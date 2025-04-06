import { JSX } from "react";

export interface ICategory {
  _id: string;
  value: string;
  label: string;
  icon: string;
}

export interface IBrand {
  _id: string;
  value: string;
  label: string;
}

export interface IColor {
  name: string;
  hexCode: string;
}

export interface ISize {
  name: string;
  measurement: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  type?: string;
  stock?: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  colors?: IColor[];
  sizes?: ISize[];
  highlights?: string[];
  discountPrice?: number;

  productPrice: number,
  finalProductPrice: number,
  productName: string,
  productImages: string[],
}

export interface IAllProducts {
  length: number;
  map(arg0: (product: any) => JSX.Element): import("react").ReactNode;
  page: number;
  totalPages: number;
  totalProducts: number;
  products: IProduct[];
}

export interface Cart {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  img: string;
  userID?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}
