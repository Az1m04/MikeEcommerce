import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";
import Image  from "next/image";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext();
  return (
<>
<nav className="fixed w-full top-0 overflow-hidden shadow-lg text-white z-10 backdrop-filter backdrop-blur-lg blur-80  border-black">
      <div className="container mx-auto grid grid-cols-2">
        <div className="flex items-center justify-start p-4">
          <Image
            // className={styles.logo}
            src="/nnneon.svg"
            alt="Next.js Logo"
            width={45}
            height={45}
            priority
          />

          <span className="  text-lg font-semibold md:text-xl md:block  hidden text-gray-800">
            <Link href="/" > MIKE SHOES</Link>
          </span>
        </div>
        <div className="flex items-center justify-end p-4">
          <button
            type="button"
            className="cart-icon absolute"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping className="text-gray-800" />
            <span className="cart-item-qty relative top-0 right-0">{totalQuantity}</span>
          </button>

        </div>
      </div>
    </nav>
{showCart && <Cart />}
</>
   
  );
};

export default Navbar;
