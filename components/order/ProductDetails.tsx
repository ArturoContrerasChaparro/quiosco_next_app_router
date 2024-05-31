import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/utils/store";
import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem
}

const MAX_ITEMS = 5
export default function ProductDetails({ item }: ProductDetailsProps) {

  const increaseQuantity = useStore((state) => state.increaseQuantity)
  const decreaseQuantity = useStore((state) => state.decreaseQuantity)
  const removeItem = useStore((state) => state.removeItem)
  const disableIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS, [item])
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
          >
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">
            {item.quantity}
          </p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            className="disabled:opacity-10"
            disabled={disableIncreaseButton}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {formatCurrency(item.subtotal)}
          <span className="font-normal">

          </span>
        </p>
      </div>
    </div>

  )
}