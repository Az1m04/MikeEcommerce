import React from "react";
import Link from "next/link";
import { urlFor } from "@/lib/client";
const Product = ({ product: { name, image, price, slug } }: any) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            className="product-image shadow-lg"
            src={urlFor(image && image[0])}
            width={250}
            height={250}
          />
          <p className="product-name mt-2">
            {name}
          </p>
          <p className="product-price">
            ${price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
