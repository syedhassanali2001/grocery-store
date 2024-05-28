import { TrashIcon } from "lucide-react";
import Image from "next/image";

function CartItemList({ cartItemList, onDeleteItem }) {
  return (
    <div>
      <div className="h-[400px] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div key={index} className="flex justify-between items-center p-2 mb-5">
            <div className="flex gap-6 items-center ">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={70}
                height={70}
                alt={cart.name}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold ">{cart.name}</h2>
                <h2 className="font-bold">Quantity : {cart.quantity}</h2>
                <h2 className="text-lg font-bold">$ {cart.amount}</h2>
              </div>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => onDeleteItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;
