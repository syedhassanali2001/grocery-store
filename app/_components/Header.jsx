"use client";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  LayoutGrid,
  LogIn,
  Search,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function Header() {
  
  const [categoryList, setCatogoryList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();
  const [subTotal, setSubTotal] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt =  sessionStorage.getItem("jwt");
  const isLogin = (sessionStorage.getItem('jwt')?true:false);
  

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  //Get category lists
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCatogoryList(resp.data.data);
    });
  };

  const getCartItems = async () => {
    if(jwt){
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItems(cartItemList_?.length);
    setCartItemList(cartItemList_);
  }
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast("Item Removed !");
      getCartItems();
    });
  };

  return (
    <div className=" flex p-5 shadow-md justify-between h-[100px]">
      <div className="flex items-center gap-8">
        <Link href={'/'}><Image
          className="flex px-2"
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"
        /></Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link
                href={"/products-category/" + category.attributes.name}
                key={index}
              >
                <DropdownMenuItem
                  className="flex gap-4 items-center cursor-pointer"
                  key={index}
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category.attributes.icon.data[0].attributes.url
                    }
                    unoptimized={true}
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <h2 className="text-lg">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 border rounded-full p-2 px-5" hidden>
          <Search />
          <input className="outline-none" type="text" placeholder="Search" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 item-center text-lg">
              <ShoppingBasket className="h-7 w-7" />
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCartItems}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white text-lg font-bold p-2 mt-5 border rounded-full">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  onDeleteItem={onDeleteItem}
                  cartItemList={cartItemList}
                ></CartItemList>
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between">
                  SubTotal<span>{subTotal.toFixed(2)}</span>
                </h2>
                <Button
                  disabled={totalCartItems === 0}
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound
                className="bg-blue-100 text-primary 
       rounded-full h-8 w-8"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={'/my-order'}><DropdownMenuItem>My Order</DropdownMenuItem></Link>
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
  
}

export default Header;
