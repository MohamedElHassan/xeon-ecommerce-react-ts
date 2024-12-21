import { X, Plus, Minus } from "lucide-react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/features/cartSlice";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export function Cart() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleRemoveItem = (
    id: string,
    selectedSize: string,
    selectedColor: string
  ) => {
    dispatch(removeFromCart({ id, selectedSize, selectedColor }));
  };

  const handleUpdateQuantity = (
    id: string,
    selectedSize: string,
    selectedColor: string,
    currentQuantity: number,
    increment: boolean
  ) => {
    dispatch(
      updateQuantity({
        id,
        selectedSize,
        selectedColor,
        quantity: increment ? currentQuantity + 1 : currentQuantity - 1,
      })
    );
  };

  return (
    <Sheet>
      <SheetTrigger className="text-3xl" asChild>
        <div className="relative group">
          <PiShoppingCartSimpleBold
            size={25}
            className="group-hover:scale-125 transition-all duration-300 cursor-pointer"
          />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
      </SheetTrigger>
      {/* <SheetContent className="w-full sm:max-w-lg"> */}
      <SheetContent className="w-[400px] sm:w-[90%]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="text-sm font-medium">EGP{item.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity,
                            false
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity,
                            true
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleRemoveItem(
                        item.id,
                        item.selectedSize,
                        item.selectedColor
                      )
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">EGP{total.toFixed(2)}</span>
                </div>
                <SheetClose className="flex items-center" asChild>
                  <Link to="/checkout">
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </SheetClose>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
