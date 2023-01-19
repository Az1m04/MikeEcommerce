import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "@/lib/client";

const HeroBanner = ({heroBanner}:any) => {

  return (
    <div className="hero-banner-container">
      <div>

        <p className="beats-soloS">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphone" className="hero-banner-image" />
      </div>
      <div>
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button">{heroBanner.buttonText}</button>
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
