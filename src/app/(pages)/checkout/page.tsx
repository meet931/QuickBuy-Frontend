"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { priceFormat } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/slice/cartSlice";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  img: string;
}

interface OrderData {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const orderFromStorage = localStorage.getItem("order");
    if (orderFromStorage) {
      setOrder(JSON.parse(orderFromStorage));
    }
  }, []);

  const handlePlaceOrder = () => {    
    toast({ title: "Order Placed Successfully!", variant: "success" });
    dispatch(clearCart());
    localStorage.removeItem("order");
    router.push("/thank-you");
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold">No Order Found</p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-9">Checkout</h1>

      <div className="space-y-6">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500 mt-2">
                Qty: {item.quantity} × {priceFormat(item.price)}
              </p>
            </div>
            <p className="text-lg font-semibold">
              {priceFormat(item.quantity * item.price)}
            </p>
          </div>
        ))}

        <div className="pt-4 text-right">
          <p className="text-xl font-semibold">
            Total: {priceFormat(order.totalPrice)}
          </p>
        </div>

        <div className="flex justify-end">
          <Button size="lg" className="mt-4" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
