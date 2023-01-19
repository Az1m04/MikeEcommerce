import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";
import { client, urlFor } from "@/lib/client";
import getStripe from "@/lib/getStripe";
import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import toast from "react-hot-toast"

const ProductDetails = ({ product, products }: any) => {
  const { image, name, description, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, inQty, qty, onAdd } = useStateContext();
  
  const handleCheckout = async (val:any) => {
    const body={...val,quantity:qty}
    const stripe = await getStripe();
    const response :any = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify([body]),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading("Redirecting");
    stripe.redirectToCheckout({sessionId:data.id});

  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item: any, i: any) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseOver={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details : </h4>
          <p>{description}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="pluse" onClick={inQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={()=>handleCheckout(product)}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>YOU MAY ALSO LIKE</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item: any) => (
              <Product key={item?._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type=="product"] {
    slug {
        current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product: any) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const query = `*[_type == "product" && slug.current =='${slug}'][0]`;
  const productQuery = `*[_type == "product"]`;
  const products = await client.fetch(productQuery);
  // console.log(products)
  const product = await client.fetch(query);
  // console.log(product)

  return {
    props: { products, product },
  };
};

export default ProductDetails;
