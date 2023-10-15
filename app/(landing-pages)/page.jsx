import { Inter } from "next/font/google";

import MainLandingPage from './MainLandingPage'

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  "title": "Scavenger | Freelance Web Devs, Just Get Back To Coding",
  "description": "Our Automated “Freelance Machine” cuts out 73% of the sales process so freelance web developers can focus on what they do best: coding.",
  "icon": "/crow.webp",
  "twitter:card": "summary_large_image",
  "twitter:site": "@scavengerleads",
  "twitter:creator": "@DavidWi11527517",
};

export default function Home() {
  return (
    <MainLandingPage />
  );
}
