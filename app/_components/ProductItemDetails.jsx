"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBag, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import {UpdateCartContext} from "../_context/UpdateCartContext";

function ProductItemDetails({ product }) {
  const [productTotalPrice, setproductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );

  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [loading,setLoading]=useState(false);
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);


  const addToCart = () => {
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userId:user.id
      },
    };
    console.log("Add to Cart Data : ", data);
    GlobalApi.addToCart(data, jwt).then((resp) => {
      console.log(resp);
      setLoading(false)
      toast("Added To Cart");
      setUpdateCart(!updateCart);
    }),
      (e) => {
        toast("Error while adding into cart");
        setLoading(false)
      };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes.images.data[0].attributes.url
        }
        alt={product.attributes.name}
        width={300}
        height={300}
        className="bg-slate-200 w-[300px] h-[300px] p-5"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.attributes.name}</h2>
        <h2 className="text-sm font-bold text-gray-500">
          {product.attributes.description}
        </h2>
        <div className="flex gap-3">
          <h2 className="font-bold text-3xl">${product.attributes.mrp}</h2>
          {product.attributes.sellingPrice && (
            <h2
              className={`font-bold text-3xl ${
                product.attributes.sellingPrice && "line-through text-gray-500"
              }`}
            >
              ${product.attributes.sellingPrice}
            </h2>
          )}
        </div>
        <h2 className="font-medium text-lg">
          Qunatity ({product.attributes.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex items-center gap-10 px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              = {(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button className="flex gap-3" onClick={() => addToCart()} 
          disabled={loading}>
            <ShoppingBasket />
           {loading?<LoaderCircle className="animate-spin"/>:'Add To Cart'}
          </Button>
          <h2>
            <span className="font-bold">Category: </span>
            {product.attributes.categories.data[0].attributes.name}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ProductItemDetails;
