import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetails from "./ProductItemDetails";

function ProductItem({ product }) {
  return (
    <div
      className="p-2 md:p-6 
    flex flex-col items-center justify-center gap-3 border rounded-lg
    hover:scale-110 hover:shadow-lg transition-all ease-in-out"
    >
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes.images.data[0].attributes.url
        }
        alt={product.attributes.name}
        width={500}
        height={200}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg text-center">
        {product.attributes.name}
      </h2>
      <div className="flex gap-3">
        <h2 className="font-bold text-lg">${product.attributes.mrp}</h2>
        {product.attributes.sellingPrice && (
          <h2
            className={`font-bold text-lg ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${product.attributes.sellingPrice}
          </h2>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            varient="outline"
            className="bg-white text-primary hover:text-white hover:bg-primary border rounded-lg"
          >
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
                <ProductItemDetails product={product}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
