"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_component/MyOrderItem";
import { ArrowBigRight } from "lucide-react";


function MyOrder() {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (!jwt) {
      router.replace("/");
    }
    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    console.log(orderList_);
    setOrderList(orderList_);
  };
  return (
    <div>
      <h2 className="bg-primary text-3xl text-center font-bold text-white">
        My Order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div>
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className="flex">
                  <ArrowBigRight className="mt-5 mx-5"></ArrowBigRight>
                  <div className="border p-2 bg-slate-100 flex gap-24 mt-3">
                    <h2>
                      <span className="font-bold mr-2">Order Date: </span>{" "}
                      {moment(item?.createdAt).format("DD/MMM/yyy")}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Total Amount: </span>$
                      {(item?.totalOrderAmount).toFixed(2)}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Status: </span>
                      {item?.status}
                    </h2>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="w-[55%] mx-12">
                  <div className="flex justify-between mt-3">
                    <h2 className="font-bold pl-8">Image</h2>
                    <h2 className="font-bold pr-2">Name & Item Price</h2>
                    <h2 className="font-bold pl-8">Quantity</h2>
                    <h2 className="font-bold pr-6">Price</h2>
                  </div>
                </div>
                {item.orderItemList.map((order, index) => (
                  <MyOrderItem orderItem={order} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
