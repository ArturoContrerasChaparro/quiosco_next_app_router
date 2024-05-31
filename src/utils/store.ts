import { create } from "zustand";
import { OrderItem } from "../types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {

        const {categoryId, image, ...data} = product
        let order : OrderItem[] = []
        if(get().order.find( item => item.id === data.id)) {
            order = get().order.map( item => item.id === product.id ? {
                ...item,
                quantity: item.quantity +1,
                subtotal: item.price *(item.quantity +1)
            }: item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
        }]

    }
        
        set(() => ({
            order
            }))
        },

        increaseQuantity: (id) => {
            set((state) => ({
                order: state.order.map( item => item.id === id ? {
                    ...item,
                    quantity: item.quantity +1,
                    subtotal: item.price *(item.quantity +1)
                }: item)
            }))
        },

        decreaseQuantity: (id) => {
            set((state: Store) => ({
                order: state.order.map(item => {
                    if (item.id === id) {
                        // Si la cantidad es mayor que 1, se decrementa la cantidad y se actualiza el subtotal
                        if (item.quantity > 1) {
                            return {
                                ...item,
                                quantity: item.quantity - 1,
                                subtotal: item.price * (item.quantity - 1)
                            };
                        } else {
                            // Si la cantidad es 1 o menos, se elimina el artículo del pedido
                            return null;
                        }
                    } else {
                        return item;
                    }
                }).filter(item => item !== null) as OrderItem[] // Filtrar los elementos nulos generados cuando se elimina un artículo
            }))
        },

        removeItem: (id) => {
            set((state) => ({
                order: state.order.filter(item => item.id !== id)
            }));
        },

        clearOrder: () => {
            set(() =>({
                order: []
            }))
        }
        
}))