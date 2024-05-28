"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { UpdateCartContext } from "../../_context/UpdateCartContext";

function Checkout() {
  const user =JSON.parse(sessionStorage.getItem("user"));
  const jwt =sessionStorage.getItem("jwt");
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalCalculated, setTotalCalculated] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getCartItems();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    console.log(cartItemList_);
    setTotalCartItems(cartItemList_?.length);
    setCartItemList(cartItemList_);
    let total = 0;
    cartItemList_.forEach((element) => {
      console.log("cart item", element);
      total = total + element.amount;
    });

    const totalRound = Number(total.toFixed(2));
    const sendVal = (totalRound + totalRound * 0.09 + 15).toFixed(2);
    setTotalAmount(sendVal);
    setSubTotal(totalRound);
    setTotalCalculated(true);
  };
   const onApprove=(data)=>{
    console.log(data);

    const payload={
      data:{
        paymentId: (data.paymentId).toString(),
        totalOrderAmount: totalAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList,
        userId: user.id
      }
    }
    GlobalApi.createOrder(payload,jwt).then(resp=>{
      toast('Order Places Successfully!')
      cartItemList.forEach((item,index)=>{
        GlobalApi.deleteCartItem(item.id,jwt).then(resp=>{ 
        })
      })
      router.replace('/order-confirmation');
    })
   }

  return (
    <div>
      <h2 className="bg-primary text-3xl text-center font-bold text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 sm:grid grid-cols-1 md:grid-cols-3 py-8">
        <div className=" md:col-span-2 mx-20">
          <h2 className="font-Bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart Items({totalCartItems})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>{subTotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>${(subTotal * 0.09).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${totalAmount}</span>
            </h2>
            <Button onClick={()=>onApprove({paymentId:1234})}>Payment<ArrowBigRight/></Button>
            {totalCalculated && (
              <PayPalButtons
                disabled={!(username&&email&&phone&&zip&&address)}
                style={{ layout: "horizontal" }}
                onApprove={onApprove}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: totalAmount,
                        },
                      },
                    ],
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
