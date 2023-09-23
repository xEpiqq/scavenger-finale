import { Inter } from "@next/font/google";

import MainLandingPage from './MainLandingPage/page'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MainLandingPage />
    </>
  );
}
