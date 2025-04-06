"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { Suspense, useEffect } from "react";
import Loading from "./loading";
import { setAuthStatus, setUser } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { authStatus, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (token && userData) {
      if (authStatus === false) {
        dispatch(setAuthStatus(true));
        dispatch(setUser(userData));
      }
    }
  }, [authStatus, user, dispatch]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        {children}
        <Footer />
      </Suspense>
    </>
  );
};

export default RootLayout;
