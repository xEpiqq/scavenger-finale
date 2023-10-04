import { MetadataRoute } from "next";

// User-Agent: *
// Allow: /
// Allow: /blog
// Allow: /blog/first-client

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      allow: "/blog",
      allow: "/blog/first-client",
      disallow: "/private/",
    },
    sitemap: "https://acme.com/sitemap.xml",
  };
}
