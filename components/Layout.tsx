import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }: any) => {
  return (
    <div className= "bg-gradient-to-tl from-gray-700 via-gray-900 to-black" style={{
      background:"linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))"
    }}>
      <Head>
        <title>E-commerce Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="overflow-hidden" >
        <div className="container mx-auto">{children}</div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
