import "node_modules/react-modal-video/css/modal-video.css";
import "../../styles/index.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      {/* <div className="bg-primary text-center py-3 sticky top-0 z-50">
          <p className="text-sm font-bold text-white">
            Act fast!  <Link href="/specialpromo" className="underline hover:text-pbblack transition duration-150"> Lock in at $49 / month for life.</Link>
          </p>
        </div> */}
      <header>
        <Navbar />
      </header>
      {children}
      {/* <footer className="bg-pbblack text-white">
          <Footer />
        </footer> */}
    </>
  );
}
