"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../../styles/index.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

        <Header />
        {children}
        <Footer />
        <ScrollToTop />
    </>
  );
}