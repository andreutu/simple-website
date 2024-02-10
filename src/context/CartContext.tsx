import { createContext, ReactNode, useContext, useReducer } from "react";
import { ADD_TO_CART } from "../utils/actions.ts";

const CartContext = createContext();

const initialState = {
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 0,
};

function getLocalStorage() {
	const cart = localStorage.getItem("cart");

	if (cart) {
		return JSON.parse(cart);
	} else {
		return [];
	}
}

function reducer(state, action) {
	switch (action.type) {
		case ADD_TO_CART: {
			const { id, color, amount, product } = action.payload;
			const tempItem = state.cart.find((item) => item.id === id + color);
			console.log(product);

			if (tempItem) {
				const tempCart = state.cart.map((cartItem) => {
					if (cartItem.id === id + color) {
						let newAmount = cartItem.amount + amount;

						if (newAmount > cartItem.max) {
							newAmount = cartItem.max;
						}

						console.log({ ...cartItem, amount: newAmount });
						return { ...cartItem, amount: newAmount };
					} else {
						return cartItem;
					}
				});
			} else {
				const newItem = {
					id: id + color,
					name: product.name,
					color,
					amount,
					image: product.images[0].url,
					price: product.price,
					max: product.stock,
				};

				console.log({ ...state, cart: [...state.cart, newItem] });

				return { ...state, cart: [...state.cart, newItem] };
			}

			break;
		}
		default:
			throw Error("No action type found!");
	}
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	function addToCart(id: number, color: string, amount: number, product: any) {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
	}

	return (
		<CartContext.Provider value={{ state, addToCart }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCartContext() {
	return useContext(CartContext);
}
