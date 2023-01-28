import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "@/lib/client";

const HeroBanner = ({heroBanner}:any) => {

  return (
    <div className="hero-banner-container  align-items-center ">
        <div className="text-4xl font-semibold text-gray-700">IN THE SPARK</div>
        <div className="text-9xl font-bold  
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-orange-500 via-purple-500 to-indigo-500
            animate-text">WE TRUST</div>
        <img src={urlFor(heroBanner.image)} alt="headphone" className="hero-banner-image" />
      <div className="">
        <Link href={`/product/mike-zoom-x`}>
          <button type="button" className="shadow-lg hover:scale-110 ease-in duration-300">{heroBanner.buttonText}</button>
        </Link>
        <div className="desc">
          <h5>DESCRIPTIONS</h5>  
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
