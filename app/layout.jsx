'use client'
import react from "react";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import  FacebookPixel from '../components/FacebookPixel/FacebookPixel'

function Layout({ children }) {
  const siteId = 3690067;
  const hotjarVersion = 6;

  useEffect(() => {
    hotjar.initialize(siteId, hotjarVersion);
  }, []);

  return (
    <html suppressHydrationWarning lang="en" className="bg-white">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <FacebookPixel />
      </body>
    </html>
  );
}

export default Layout;