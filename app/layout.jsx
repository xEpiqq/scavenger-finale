import react from "react";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import Hotjar from "@hotjar/browser";

function Layout({ children }) {
  const siteId = 3690067;
  const hotjarVersion = 6;

  Hotjar.init(siteId, hotjarVersion);

  return (
    <html suppressHydrationWarning lang="en" className="bg-white">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

export default Layout;
