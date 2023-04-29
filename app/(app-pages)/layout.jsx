import react from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import "../../styles/index.css";

function Layout({ children }) {
  return (
    <div className="flex flex-row bg-white w-full h-full text-black">
      <Navbar />
      <section className="w-full h-full">
        <Header />
        {children}
      </section>
    </div>
  );
}

export default Layout;
