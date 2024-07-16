import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pizzaCartProps } from "../../components/PizzaCart";
import { IupdatePizzaQuantity } from "../../interfaces/interfaces";
import { RootState } from "../store";

interface cartSliceState {
    totalPrice: number;
    quantityOfPizzas: number;
    cartPizzas: pizzaCartProps[]
}

const initialState: cartSliceState = {
    cartPizzas: [],
    quantityOfPizzas: 0,
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizza: (state, action: PayloadAction<pizzaCartProps>) => {
            const isInCart = state.cartPizzas.find(
                (pizza) => pizza.id === action.payload.id
            );

            if (isInCart) {
                isInCart.count++;
            } else {
                const readyPizza = { ...action.payload, count: 1 };
                state.cartPizzas.push(readyPizza);
            }

            state.totalPrice = state.cartPizzas.reduce((sum, pizza) => {
                return sum + pizza.price * pizza.count;
            }, 0);

            state.quantityOfPizzas = state.cartPizzas.reduce((sum, pizza) => {
                return sum + pizza.count;
            }, 0);
        },
        removePizza: (state, action: PayloadAction<number>) => {
            state.cartPizzas = state.cartPizzas.filter(
                (pizza) => pizza.id !== action.payload
            ); // передаем id пиццы

            state.totalPrice = state.cartPizzas.reduce((sum, pizza) => {
                return sum + pizza.price * pizza.count;
            }, 0);

            state.quantityOfPizzas = state.cartPizzas.reduce((sum, pizza) => {
                return sum + pizza.count;
            }, 0);
        },
        clearCart: (state) => {
            state.cartPizzas = [];
            state.totalPrice = 0;
            state.quantityOfPizzas = 0;
        },
        updatePizzaQuantity: (state, action: PayloadAction<IupdatePizzaQuantity>) => {
            const { id, type } = action.payload;
            const pizza = state.cartPizzas.find((pizza) => pizza.id === id);

            if (pizza) {
                if (type === "increment") {
                    pizza.count++;
                } else if (type === "decrement" && pizza.count > 1) {
                    pizza.count--;
                }

                state.totalPrice = state.cartPizzas.reduce((sum, pizza) => {
                    return sum + pizza.price * pizza.count;
                }, 0);

                state.quantityOfPizzas = state.cartPizzas.reduce((sum, pizza) => {
                    return sum + pizza.count;
                }, 0);
            }
        },
    },
});

export const { addPizza, removePizza, clearCart, updatePizzaQuantity } = cartSlice.actions;

export const selectCartPizzas = (state: RootState) => state.cart.cartPizzas;
export const selectQuantityOfPizzas = (state: RootState) => state.cart.quantityOfPizzas;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
